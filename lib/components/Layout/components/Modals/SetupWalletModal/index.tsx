import { isFirefox, isMobile } from "react-device-detect";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { selectIsOpenWalletSetupModal, actions } from "@/lib/states/appState";
import { openExternalUrl } from "@/lib/utils/functions";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AppsIcon from "@mui/icons-material/Apps";
import LockIcon from "@mui/icons-material/Lock";

export const SetupWalletModal = () => {
  const { setWalletSetupModal } = actions;
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpenWalletSetupModal);

  const handleClose = () => dispatch(setWalletSetupModal(false));

  const openStore = () => {
    const url = isFirefox
      ? "https://addons.mozilla.org/en-US/firefox/addon/signum-xt-wallet/"
      : "https://chrome.google.com/webstore/detail/signum-xt-wallet/kdgponmicjmjiejhifbjgembdcaclcib";

    openExternalUrl(url);
  };

  const resetWebsite = () => window.location.reload();

  if (isMobile) return <></>;

  return (
    <Dialog
      onClose={handleClose}
      open={isOpen}
      sx={{ maxWidth: 500, mx: "auto" }}
    >
      <DialogTitle sx={{ textAlign: "center" }}>
        Try the Signum XT Wallet
      </DialogTitle>

      <DialogContent dividers>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          columnSpacing={2}
        >
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{
                textTransform: "none",
                mb: 1,
                py: 1,
                color: "#ffffff",
              }}
              startIcon={<AccountBalanceWalletIcon />}
              onClick={openStore}
            >
              Install
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                textTransform: "none",
                mb: 1,
                py: 1,
                color: "#ffffff",
              }}
              onClick={resetWebsite}
            >
              The wallet is installed
            </Button>
          </Grid>
        </Grid>

        <DialogContentText sx={{ textAlign: "center" }}>
          Install the wallet and then sign in or create a new account in order
          to use Signum DApps with one click
        </DialogContentText>
      </DialogContent>

      <DialogContent>
        <Alert
          severity="info"
          icon={<AppsIcon fontSize="inherit" />}
          sx={{ mb: 1, width: "100%", fontWeight: 500 }}
        >
          Connect to Signum DApps easily!
        </Alert>

        <Alert
          severity="success"
          icon={<LockIcon fontSize="inherit" />}
          sx={{ width: "100%", fontWeight: 500 }}
        >
          Your private key will be stored locally in your browser
        </Alert>
      </DialogContent>
    </Dialog>
  );
};
