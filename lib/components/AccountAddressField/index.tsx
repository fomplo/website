import { useFormContext, Controller } from "react-hook-form";
import { debounce } from "lodash";
import { useRef, useEffect, useState } from "react";
import { useLedger } from "@/lib/hooks/useLedger";
import { useAccount } from "@/lib/hooks/useAccount";
import { asRSAddress, asAccountId } from "@/lib/utils/accountAddress";
import { mapValidationError } from "@/lib/utils/mapValidationError";

import TextField from "@mui/material/TextField";

interface Props {
  isAddressValid: boolean;
  setIsAccountValid: (value: boolean) => void;
  allowSelfAddress?: boolean;
}

export const AccountAddressField = ({
  isAddressValid,
  setIsAccountValid,
  allowSelfAddress,
}: Props) => {
  const { accountId } = useAccount();
  const ledger = useLedger();

  const [receiverAddressFieldError, setReceiverAddressFieldError] =
    useState("");

  const [receiverAddressHelperText, setReceiverAddressHelperText] =
    useState("");

  const debouncedCheckAccountFn = useRef<any>();

  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<{
    receiverAddress?: string;
  }>();

  const receiverAddress = watch("receiverAddress");

  useEffect(() => {
    return () => {
      debouncedCheckAccountFn.current &&
        debouncedCheckAccountFn.current.cancel();
    };
  }, []);

  useEffect(() => {
    if (!receiverAddress || !debouncedCheckAccountFn.current) return;

    const accountAddressId = asAccountId(receiverAddress);
    debouncedCheckAccountFn.current(accountAddressId);
  }, [receiverAddress]);

  useEffect(() => {
    debouncedCheckAccountFn.current = debounce(async (accountId: string) => {
      if (!accountId || !ledger) {
        setIsAccountValid(false);
        return;
      }

      try {
        await ledger.account.getAccount({ accountId });
        setIsAccountValid(true);
      } catch (e: any) {
        setIsAccountValid(false);
      }
    }, 300);
  }, [ledger, setIsAccountValid]);

  useEffect(() => {
    if (receiverAddress && errors.receiverAddress?.message) {
      setIsAccountValid(false);

      return setReceiverAddressFieldError(
        mapValidationError(errors.receiverAddress?.message)
      );
    }
  }, [receiverAddress, errors.receiverAddress?.message]);

  useEffect(() => {
    const invalidAddressFeedback = () => {
      setIsAccountValid(false);
      return setReceiverAddressFieldError("Invalid address");
    };

    if (receiverAddress) {
      const receiverAccountId = asAccountId(receiverAddress);
      const isOwnAccount = accountId == receiverAccountId;

      if (!receiverAccountId || receiverAccountId == "0") {
        return invalidAddressFeedback();
      }

      if (isOwnAccount && !allowSelfAddress) {
        setIsAccountValid(false);
        return setReceiverAddressFieldError("This is your own account");
      }

      if (isAddressValid) {
        setReceiverAddressFieldError("");

        const successHelperText =
          allowSelfAddress && isOwnAccount
            ? "This is your own account ✅"
            : `${asRSAddress(receiverAccountId)} (ID:${receiverAccountId}) ✅`;

        return setReceiverAddressHelperText(successHelperText);
      } else {
        return invalidAddressFeedback();
      }
    } else {
      setReceiverAddressHelperText("");
    }
  }, [isAddressValid, receiverAddress, accountId, allowSelfAddress]);

  return (
    <Controller
      name="receiverAddress"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          onChange={(e) => field.onChange(e.target.value.toLocaleUpperCase())}
          fullWidth
          autoComplete="off"
          label="Enter the Address or account ID"
          variant="outlined"
          color="secondary"
          placeholder="E.g. S-6SJC-..., 17332"
          helperText={receiverAddressFieldError || receiverAddressHelperText}
          error={!!receiverAddressFieldError}
          sx={{ mb: 2 }}
          inputProps={{
            maxLength: 64,
          }}
        />
      )}
    />
  );
};
