import { useAppSelector } from "@/states/hooks";
import { selectIsOpenSignTransactionModal } from "@/lib/states/appState";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

export const SignTransactionModal = () => {
  const isOpen = useAppSelector(selectIsOpenSignTransactionModal);

  return (
    <Dialog open={isOpen} sx={{ maxWidth: 500, mx: "auto" }}>
      <DialogContent>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <AccountBalanceWalletIcon fontSize="large" />
          <Typography variant="h5" align="center" fontWeight={800}>
            Please sign the message in your wallet to continue
          </Typography>

          <Typography align="center">
            We need this signature to verify that you are the owner of this
            Signum account.
          </Typography>

          <CircularProgress size={40} sx={{ my: 2, color: "inherit" }} />

          <Alert severity="info" sx={{ fontWeight: 500 }}>
            We will never own your private keys and cannot access your funds
            without your confirmation.
          </Alert>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
