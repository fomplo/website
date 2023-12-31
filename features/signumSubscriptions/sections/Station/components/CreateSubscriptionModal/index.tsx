import { useState, useMemo } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { Amount } from "@signumjs/util";
import { Address, UnsignedTransaction } from "@signumjs/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "@/lib/hooks/useSnackbar";
import { useLedger } from "@/lib/hooks/useLedger";
import { useAccount } from "@/lib/hooks/useAccount";
import { useAppDispatch } from "@/states/hooks";
import { transactionActions } from "@/lib/states/transactionState";
import { useExtensionWallet } from "@/lib/hooks/useExtensionWallet";
import { mapValidationError } from "@/lib/utils/mapValidationError";
import { asAccountAddress, asAccountId } from "@/lib/utils/accountAddress";
import { TextLabel } from "@/lib/components/TextLabel";
import { AccountAddressField } from "@/lib/components/AccountAddressField";
import { SuccessfulModal } from "@/lib/components/SuccessfulModal";
import { NumericField } from "@/lib/components/NumericField";
import {
  signStartWalletEvent,
  signEndWalletEvent,
} from "@/lib/utils/walletSignEvent";
import { transactionError } from "@/lib/utils/transactionErrorFeedback";
import { CreateSubscription } from "./validation/types";
import { createSubscriptionSchema } from "./validation/schemas";
import { billingAmounts, billingPeriods } from "./utils/billingPeriods";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const CreateSubscriptionModal = ({ open, handleClose }: Props) => {
  const { publicKey, availableBalance } = useAccount();
  const { showError } = useSnackbar();
  const ledger = useLedger();
  const wallet = useExtensionWallet();
  const dispatch = useAppDispatch();

  const [isAddressValid, setIsAddressValid] = useState(false);
  const [isOperationCompleted, setIsOperationCompleted] = useState(false);
  const setOperationAsCompleted = () => setIsOperationCompleted(true);

  const methods = useForm<CreateSubscription>({
    mode: "onChange",
    resolver: yupResolver(createSubscriptionSchema),
    defaultValues: {
      receiverAddress: "",
      cost: "",
      billingAmount: "1",
      billingFormat: "month",
    },
  });

  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const receiverAddress = watch("receiverAddress");
  const cost = watch("cost");
  const billingAmount = watch("billingAmount");
  const billingFormat = watch("billingFormat");

  const formatedBillingAmounts = useMemo(() => {
    if (billingFormat === "month") {
      return billingAmounts.filter((billingAmount) => billingAmount <= 12);
    }

    return billingAmounts;
  }, [billingAmounts, billingFormat]);

  const onSubmit: SubmitHandler<CreateSubscription> = async (data) => {
    if (!ledger || !wallet || !wallet.connection) return;

    const { receiverAddress, cost, billingAmount, billingFormat } = data;

    let billingFrequency = 0;
    let billingAmountCycle = Number(billingAmount);

    switch (billingFormat) {
      case "day":
        billingFrequency = billingAmountCycle * 24 * 60 * 60;
        break;

      case "week":
        billingFrequency = billingAmountCycle * 604800;
        break;

      case "month":
        billingFrequency = billingAmountCycle * 2628000;
        break;

      default:
        return alert("Invalid Date");
    }

    const payload = {
      amount: Amount.fromSigna(cost).getPlanck(),
      receiverAddress: asAccountId(receiverAddress) || "",
      billingFrequency,
    };

    try {
      const address = Address.fromPublicKey(publicKey || "");
      const recipientAddress = asAccountAddress(payload.receiverAddress);

      const { unsignedTransactionBytes } =
        // @ts-ignore
        (await ledger.transaction.createSubscription({
          amountPlanck: payload.amount,
          frequency: payload.billingFrequency,
          feePlanck: Amount.fromSigna(0.02).getPlanck(),
          senderPublicKey: address.getPublicKey(),
          recipientPublicKey: recipientAddress.getPublicKey(),
          recipientId: recipientAddress.getNumericId(),
        })) as UnsignedTransaction;

      signStartWalletEvent();

      const { transactionId: txId } = await wallet.confirm(
        unsignedTransactionBytes
      );

      dispatch(
        transactionActions.addMonitor({
          transactionId: txId,
          referenceId: txId,
          type: "subscription-creation",
        })
      );

      if (txId) setOperationAsCompleted();
    } catch (e: any) {
      transactionError(e, showError);
    } finally {
      signEndWalletEvent();
    }
  };

  const closeDialog = () => {
    reset();
    setIsOperationCompleted(false);
    handleClose();
  };

  let receiverAddressFieldError = "";
  let costFieldError = "";

  // Normal validation
  if (errors.receiverAddress?.message) {
    receiverAddressFieldError = mapValidationError(
      errors.receiverAddress?.message
    );
  }

  if (errors.cost?.message) {
    costFieldError = mapValidationError(errors.cost?.message);
  }

  if (Number(cost) > availableBalance) {
    costFieldError = "Not enough funds available";
  }

  const canSubmitNewSubscription = !!(
    receiverAddress &&
    isAddressValid &&
    cost &&
    billingAmount &&
    billingFormat &&
    !receiverAddressFieldError &&
    !costFieldError
  );

  if (isOperationCompleted) {
    return (
      <SuccessfulModal
        isOpen={isOperationCompleted}
        handleClose={closeDialog}
        title="Subscription created successfully!"
        description="Your subscription is getting created. You need to wait at least between 4-8 minutes. Let the blockchain do everything for you 😀"
      />
    );
  }

  return (
    <Dialog maxWidth="md" open={open} onClose={closeDialog}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Create New Subscription</DialogTitle>

        <DialogContent sx={{ minWidth: { xs: 300, md: 500 } }}>
          <FormProvider {...methods}>
            <Stack>
              <TextLabel text="Receiver address" required gutterBottom />
              <AccountAddressField
                isAddressValid={isAddressValid}
                setIsAccountValid={setIsAddressValid}
              />

              <Divider flexItem sx={{ my: 1 }} />

              <TextLabel text="Amount" required gutterBottom />
              <Controller
                name="cost"
                control={control}
                render={({ field }) => (
                  <NumericField
                    field={field}
                    label="Amount"
                    sx={{ mb: 2 }}
                    helperText={costFieldError}
                    error={!!costFieldError}
                  />
                )}
              />

              <Divider flexItem sx={{ my: 1 }} />

              <TextLabel text="Billing Cycle (Subscription period)" required />

              <Stack direction="row" alignItems="center" mt={2} spacing={2}>
                <Typography variant="body2" color="textSecondary">
                  Every
                </Typography>

                <FormControl fullWidth color="secondary" sx={{ maxWidth: 100 }}>
                  <Controller
                    name="billingAmount"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} fullWidth defaultValue="">
                        {formatedBillingAmounts.map((billingAmount) => (
                          <MenuItem key={billingAmount} value={billingAmount}>
                            {billingAmount}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>

                <FormControl fullWidth color="secondary">
                  <InputLabel>Period</InputLabel>

                  <Controller
                    name="billingFormat"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        fullWidth
                        defaultValue=""
                        label="Period"
                      >
                        {billingPeriods.map((billingPeriod) => (
                          <MenuItem
                            key={billingPeriod.value}
                            value={billingPeriod.value}
                          >
                            {billingPeriod.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Stack>
            </Stack>
          </FormProvider>
        </DialogContent>

        <DialogActions>
          <Button color="error" onClick={closeDialog}>
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            autoFocus
            disabled={!canSubmitNewSubscription}
          >
            Add new subscription
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
