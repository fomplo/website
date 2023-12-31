import { useState, useEffect, useMemo } from "react";
import { Amount } from "@signumjs/util";
import {
  Address,
  Block,
  Transaction,
  UnsignedTransaction,
} from "@signumjs/core";
import { InputBox } from "@/lib/components/InputBox";
import { DefaultContainer } from "@/lib/components/Cards/DefaultContainer";
import {
  formatInputNumber,
  addCommaToNumber,
  formatAmount,
} from "@/lib/utils/functions";
import {
  viewTransactionInExplorer,
  viewBlockInExplorer,
} from "@/lib/utils/explorer";
import { useAppSelector } from "@/states/hooks";
import { useExtensionWallet } from "@/lib/hooks/useExtensionWallet";
import { useLedger } from "@/lib/hooks/useLedger";
import { useSnackbar } from "@/lib/hooks/useSnackbar";
import { useAccount } from "@/lib/hooks/useAccount";
import { useTimeout } from "@/lib/hooks/useTimeout";
import { selectIsWalletConnected } from "@/lib/states/walletState";
import {
  signStartWalletEvent,
  signEndWalletEvent,
} from "@/lib/utils/walletSignEvent";
import { transactionError } from "@/lib/utils/transactionErrorFeedback";
import { WalletSetup } from "./components/WalletSetup";

import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import AlertTitle from "@mui/material/AlertTitle";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import CachedIcon from "@mui/icons-material/Cached";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

interface Props {
  loading: boolean;
  currentBlockHeight: number;
  accountBlocks: Block[];
  accountAddCommitmentTransactions: Transaction[];
}

type operations = "add" | "remove";

export const Station = ({
  loading,
  currentBlockHeight,
  accountBlocks,
  accountAddCommitmentTransactions,
}: Props) => {
  const { showError } = useSnackbar();
  const { publicKey } = useAccount();
  const isWalletConnected = useAppSelector(selectIsWalletConnected);
  const wallet = useExtensionWallet();
  const ledger = useLedger();

  const [lockSubmitDueToForgedBlock, setLockSubmitDueToForgedBlock] =
    useState(false);

  const [
    lockSubmitButtonDueToAddedCommitment,
    setLockSubmitButtonDueToAddedCommitment,
  ] = useState(false);

  const [operation, setOperation] = useState<operations>("add");
  const [commitmentInput, setCommitmentInput] = useState("");
  const [successfullTx, setSuccessfullTx] = useState("");
  const [errorFeedback, setErrorFeedback] = useState("");

  const setAddMode = () => setOperation("add");
  const setRemoveMode = () => setOperation("remove");

  const onChangeInput = (e: any) => {
    let { name, value } = e.currentTarget;
    if (name !== "commitment") return;

    let finalValue = formatInputNumber(value) || "0";

    if (finalValue && finalValue !== "0" && !finalValue.includes("."))
      finalValue = parseFloat(finalValue).toString();

    setCommitmentInput(finalValue);
  };

  const resetStates = () => {
    setCommitmentInput("");
    setSuccessfullTx("");
    setErrorFeedback("");
  };

  useEffect(() => {
    resetStates();
  }, [operation, publicKey]);

  const handleCommitment = () => {
    if (!commitmentInput || commitmentInput == "0" || loading) return;
    setErrorFeedback("");
    setSuccessfullTx("");

    if (operation === "add") addCommitment();
    if (operation === "remove") removeCommitment();
  };

  const addCommitment = async () => {
    if (!ledger || !wallet || !wallet.connection) return;

    try {
      const address = Address.fromPublicKey(publicKey || "");

      const { unsignedTransactionBytes } = (await ledger.account.addCommitment({
        feePlanck: Amount.fromSigna(0.02).getPlanck(),
        senderPublicKey: address.getPublicKey(),
        amountPlanck: Amount.fromSigna(commitmentInput).getPlanck(),
      })) as UnsignedTransaction;

      signStartWalletEvent();

      const { transactionId: txId } = await wallet.confirm(
        unsignedTransactionBytes
      );

      setSuccessfullTx(txId);
    } catch (e: any) {
      transactionError(e, showError, setErrorFeedback);
    } finally {
      signEndWalletEvent();
    }
  };

  const removeCommitment = async () => {
    if (!ledger || !wallet || !wallet.connection) return;

    try {
      const address = Address.fromPublicKey(publicKey || "");

      const { unsignedTransactionBytes } =
        (await ledger.account.removeCommitment({
          feePlanck: Amount.fromSigna(0.02).getPlanck(),
          senderPublicKey: address.getPublicKey(),
          amountPlanck: Amount.fromSigna(commitmentInput).getPlanck(),
        })) as UnsignedTransaction;

      signStartWalletEvent();

      const { transactionId: txId } = await wallet.confirm(
        unsignedTransactionBytes
      );

      setSuccessfullTx(txId);
    } catch (e: any) {
      transactionError(e, showError, setErrorFeedback);
    } finally {
      signEndWalletEvent();
    }
  };

  const openTransaction = () =>
    successfullTx && viewTransactionInExplorer(successfullTx);

  const accountLastForgedBlock = accountBlocks.length
    ? accountBlocks[0]
    : undefined;

  const accountLastAddCommitmentTransaction =
    accountAddCommitmentTransactions.length
      ? accountAddCommitmentTransactions[0]
      : undefined;

  let forgedBlockTimeFrame = useMemo(() => {
    // Check when was the last time the user forged a block
    if (accountLastForgedBlock && operation === "remove") {
      const accountLastForgedHeight = Number(accountLastForgedBlock.height);
      const forgedBlockDeadline = accountLastForgedHeight + 1440;

      if (currentBlockHeight < forgedBlockDeadline) {
        setLockSubmitDueToForgedBlock(true);
        return forgedBlockDeadline - currentBlockHeight;
      }
    }

    setLockSubmitDueToForgedBlock(false);
    return 0;
  }, [accountLastForgedBlock, operation, currentBlockHeight]);

  let addedCommitmentTimeFrame = useMemo(() => {
    // Check when was the last time the user added commitment to the account
    if (accountLastAddCommitmentTransaction) {
      const addCommitmentTransactionHeight = Number(
        accountLastAddCommitmentTransaction.height
      );

      const addCommitmentDeadline = addCommitmentTransactionHeight + 1440;

      if (currentBlockHeight < addCommitmentDeadline) {
        setLockSubmitButtonDueToAddedCommitment(
          operation === "remove" ? true : false
        );

        return addCommitmentDeadline - currentBlockHeight;
      }
    }

    setLockSubmitButtonDueToAddedCommitment(false);
    return 0;
  }, [accountLastAddCommitmentTransaction, operation, currentBlockHeight]);

  const forgedBlockLabel = useTimeout(forgedBlockTimeFrame);
  const addedCommitmentLabel = useTimeout(addedCommitmentTimeFrame);

  let disableSubmitButton = !!(
    (lockSubmitDueToForgedBlock || lockSubmitButtonDueToAddedCommitment) &&
    operation === "remove"
  );

  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Typography
        component="h1"
        variant="h5"
        fontWeight={700}
        sx={{ width: "100%", textAlign: { xs: "center", lg: "left" } }}
        gutterBottom
      >
        Signum Commitment Station
      </Typography>

      {!isWalletConnected && <WalletSetup />}

      {isWalletConnected && (
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing={2}
          mb={1}
        >
          <Grid item>
            <Button
              color={operation === "add" ? "primary" : "inherit"}
              variant={operation === "add" ? "contained" : undefined}
              startIcon={<AddCircleOutlineIcon />}
              sx={{ textTransform: "none" }}
              onClick={setAddMode}
            >
              Add Commitment
            </Button>
          </Grid>

          <Grid item>
            <Button
              color={operation === "remove" ? "warning" : "inherit"}
              variant={operation === "remove" ? "contained" : undefined}
              startIcon={<RemoveCircleOutlineIcon />}
              sx={{ textTransform: "none" }}
              onClick={setRemoveMode}
            >
              Remove Commitment
            </Button>
          </Grid>
        </Grid>
      )}

      {isWalletConnected && (
        <DefaultContainer>
          {!successfullTx && (
            <Grid
              container
              item
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              maxWidth={400}
              mx="auto"
            >
              <Typography
                variant="h6"
                color="textSecondary"
                align="center"
                gutterBottom
              >
                {operation == "add" && "Enter how much Signa you will commit"}
                {operation == "remove" && "How much Signa you will uncommit?"}
              </Typography>

              <InputBox
                name="commitment"
                valueLabel={
                  commitmentInput ? addCommaToNumber(commitmentInput) : "0"
                }
                optionLabel="SIGNA"
                onInputChange={onChangeInput}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  textTransform: "none",
                  mt: 2,
                  py: 1,
                  color: "#ffffff",
                  maxWidth: 400,
                  display: "flex",
                  mx: "auto",
                }}
                startIcon={
                  operation == "add" ? (
                    <AddCircleOutlineIcon />
                  ) : (
                    <RemoveCircleOutlineIcon />
                  )
                }
                disabled={disableSubmitButton}
                onClick={handleCommitment}
              >
                {operation == "add" && "Add commitment"}
                {operation == "remove" && "Remove commitment"}
              </Button>

              {errorFeedback && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  <strong>{errorFeedback}</strong>
                </Alert>
              )}
            </Grid>
          )}

          {successfullTx && (
            <Grid
              container
              item
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              maxWidth={400}
              mx="auto"
            >
              <Grid item>
                <Typography align="center" fontWeight={700}>
                  Successfully executed the transaction ❤️
                </Typography>
              </Grid>

              <Divider sx={{ mt: 1, mb: 2, width: "100%" }} />

              <Grid item px={4} mb={2}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ color: "white", textTransform: "none" }}
                  onClick={openTransaction}
                  startIcon={<TravelExploreIcon />}
                >
                  See transaction in explorer
                </Button>
              </Grid>

              <Grid item px={4} mb={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{ color: "white", textTransform: "none" }}
                  onClick={resetStates}
                  startIcon={<CachedIcon />}
                >
                  {operation === "add" && "Commit Again"}

                  {operation === "remove" && "Uncommit Again"}
                </Button>
              </Grid>

              <Grid item>
                <Typography align="center" fontWeight={500}>
                  {operation === "add" &&
                    "🚀 Congratulations, the committed balance is getting updated, newly added commitment becomes active for mining after 1,440 blocks (around 4 days)"}

                  {operation === "remove" &&
                    "🚀 Congrats, the committed balance is being updated"}
                </Typography>
              </Grid>

              {operation === "remove" && (
                <Grid item>
                  <Divider sx={{ mt: 1, mb: 2, width: "100%" }} />
                </Grid>
              )}
            </Grid>
          )}

          {lockSubmitDueToForgedBlock && operation === "remove" && (
            <Alert severity="success" sx={{ mt: 2 }}>
              <AlertTitle>Notice: Mined block in less than 4 days.</AlertTitle>

              <Typography variant="body2" gutterBottom>
                <strong>
                  You will be able to remove commitment in approximately{" "}
                  {forgedBlockLabel}{" "}
                </strong>

                {"(" + formatAmount(forgedBlockTimeFrame) + " blocks)"}
              </Typography>

              <Typography variant="body2" gutterBottom>
                You can not remove commitment because{" "}
                <strong>you had mined a block in less than 4 days</strong>
              </Typography>

              <Typography variant="body2" gutterBottom>
                If your miner does not find a block or add commitment in 4 days,
                you can remove commitment
              </Typography>

              <Typography variant="body2" gutterBottom>
                <strong>Reminder:</strong> the commitment funds will always be
                on your account
              </Typography>

              {accountLastForgedBlock && (
                <Button
                  sx={{ textTransform: "none" }}
                  startIcon={<OpenInNewIcon />}
                  onClick={() => {
                    viewBlockInExplorer(String(accountLastForgedBlock.height));
                  }}
                >
                  View last block mined in explorer
                </Button>
              )}
            </Alert>
          )}

          {lockSubmitButtonDueToAddedCommitment && operation === "remove" && (
            <Alert severity="info" sx={{ mt: 2 }}>
              <AlertTitle>
                Notice: Committed funds in less than 4 days
              </AlertTitle>

              <Typography variant="body2" gutterBottom>
                <strong>
                  You will be able to remove commitment in approximately{" "}
                  {addedCommitmentLabel}{" "}
                </strong>
                {"(" + formatAmount(addedCommitmentTimeFrame) + " blocks)"}
              </Typography>

              <Typography variant="body2" gutterBottom>
                You can not remove commitment because{" "}
                <strong>you added commitment less than 4 days ago</strong>
              </Typography>

              <Typography variant="body2" gutterBottom>
                If your miner does not find a block or add commitment in 4 days,
                you can remove commitment
              </Typography>

              <Typography variant="body2" gutterBottom>
                <strong>Reminder:</strong> the commitment funds will always be
                on your account
              </Typography>

              {accountLastAddCommitmentTransaction && (
                <Button
                  sx={{ textTransform: "none" }}
                  startIcon={<OpenInNewIcon />}
                  onClick={() => {
                    viewTransactionInExplorer(
                      accountLastAddCommitmentTransaction.transaction
                    );
                  }}
                >
                  View transaction in explorer
                </Button>
              )}
            </Alert>
          )}

          {!!(addedCommitmentTimeFrame && operation === "add") && (
            <Alert
              icon={<CircularProgress size={20} />}
              severity="info"
              sx={{ mt: 2 }}
            >
              <AlertTitle>Commitment funds are getting updated</AlertTitle>
              <Typography variant="body2" gutterBottom>
                We have detected that{" "}
                <strong>you added commitment less than 4 days ago</strong>
              </Typography>
              <Typography variant="body2" gutterBottom>
                The Signum Blockchain will update the Effective Committed
                Balance in approximately <br />{" "}
                <strong> {addedCommitmentLabel} </strong>
                {"(" + formatAmount(addedCommitmentTimeFrame) + " blocks)"}
              </Typography>{" "}
              {accountLastAddCommitmentTransaction && (
                <Button
                  sx={{ textTransform: "none" }}
                  startIcon={<OpenInNewIcon />}
                  onClick={() => {
                    viewTransactionInExplorer(
                      accountLastAddCommitmentTransaction.transaction
                    );
                  }}
                >
                  View transaction in explorer
                </Button>
              )}
            </Alert>
          )}
        </DefaultContainer>
      )}
    </Grid>
  );
};
