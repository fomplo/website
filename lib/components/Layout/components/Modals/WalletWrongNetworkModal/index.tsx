import { isMobile } from "react-device-detect";
import { useAppContext } from "@/lib/hooks/useAppContext";
import { requestWalletConnection } from "@/lib/utils/requestWalletConnection";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import {
  actions,
  selectIsOpenWalletWrongNetworkModal,
} from "@/lib/states/appState";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import NetworkIcon from "@mui/icons-material/Podcasts";

export const WalletWrongNetworkModal = () => {
  const { Ledger } = useAppContext();
  const { setWalletWrongNetworkModal } = actions;
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpenWalletWrongNetworkModal);

  const handleClose = () => {
    localStorage.removeItem("rememberWalletConnection");
    dispatch(setWalletWrongNetworkModal(false));
  };

  const handleConnection = () => {
    requestWalletConnection();
    handleClose();
  };

  if (isMobile) return <></>;

  let signumNode = "Signum (Mainnet Node)";
  if (Ledger.Network === "Signum-TESTNET") signumNode = "Signum (Testnet Node)";

  return (
    <Dialog
      onClose={handleClose}
      open={isOpen}
      sx={{ maxWidth: 500, mx: "auto" }}
    >
      <DialogTitle sx={{ textAlign: "center" }}>
        Unsupported Network Selected
      </DialogTitle>

      <DialogContent dividers>
        <DialogContentText sx={{ textAlign: "center" }}>
          XT Wallet was successfully detected, but the currently selected
          network in the wallet does not match the required network.
        </DialogContentText>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            textTransform: "none",
            my: 1,
            py: 1,
            color: "#ffffff",
          }}
          startIcon={<AccountBalanceWalletIcon />}
          onClick={handleConnection}
        >
          Connect Wallet
        </Button>

        <DialogContentText sx={{ textAlign: "center" }}>
          Please, select a node in the XT wallet of the correct network, and
          retry connection.
        </DialogContentText>
      </DialogContent>

      <DialogContent>
        <Alert
          severity="info"
          icon={<NetworkIcon fontSize="inherit" />}
          sx={{
            mb: 1,
            "& .MuiAlert-message": {
              width: "100%",
            },
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption">
              This DApp requires the following network
            </Typography>

            <Box
              sx={{
                mt: 1,
                border: 1,
                borderRadius: 1,
                borderColor: "divider",
                textAlign: "center",
              }}
            >
              <Typography variant="body1">{signumNode}</Typography>
            </Box>
          </Box>
        </Alert>
      </DialogContent>
    </Dialog>
  );
};
