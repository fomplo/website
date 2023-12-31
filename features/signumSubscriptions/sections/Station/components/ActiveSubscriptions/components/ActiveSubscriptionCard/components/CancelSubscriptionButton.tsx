import { useState, MouseEvent, useMemo } from "react";
import { Amount } from "@signumjs/util";
import { Address, UnsignedTransaction } from "@signumjs/core";
import { useSnackbar } from "@/lib/hooks/useSnackbar";
import { useAccount } from "@/lib/hooks/useAccount";
import { useLedger } from "@/lib/hooks/useLedger";
import { useAppSelector, useAppDispatch } from "@/states/hooks";
import { useExtensionWallet } from "@/lib/hooks/useExtensionWallet";
import {
  signStartWalletEvent,
  signEndWalletEvent,
} from "@/lib/utils/walletSignEvent";
import {
  selectMonitoredTransactions,
  transactionActions,
} from "@/lib/states/transactionState";
import { transactionError } from "@/lib/utils/transactionErrorFeedback";
import { LoopIcon } from "@/lib/components/LoopIcon";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface Props {
  id: string;
}

export const CancelSubscriptionButton = ({ id }: Props) => {
  const { publicKey } = useAccount();
  const { showError } = useSnackbar();

  const ledger = useLedger();
  const wallet = useExtensionWallet();
  const dispatch = useAppDispatch();
  const monitoredTransactions = useAppSelector(selectMonitoredTransactions);

  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isCancelling = useMemo(() => {
    return Boolean(
      monitoredTransactions.find(
        ({ referenceId, type }) =>
          referenceId === id && type === "subscription-cancel"
      )
    );
  }, [id, monitoredTransactions]);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const cancelSubscription = async () => {
    if (!ledger || !wallet || !wallet.connection) return closeMenu();

    try {
      const address = Address.fromPublicKey(publicKey || "");

      const { unsignedTransactionBytes } =
        // @ts-ignore
        (await ledger.transaction.cancelSubscription({
          subscriptionId: id,
          feePlanck: Amount.fromSigna(0.02).getPlanck(),
          senderPublicKey: address.getPublicKey(),
        })) as UnsignedTransaction;

      signStartWalletEvent();

      const { transactionId: txId } = await wallet.confirm(
        unsignedTransactionBytes
      );

      dispatch(
        transactionActions.addMonitor({
          transactionId: txId,
          referenceId: id,
          type: "subscription-cancel",
        })
      );
    } catch (e: any) {
      transactionError(e, showError);
    } finally {
      signEndWalletEvent();
      closeMenu();
    }
  };

  const canBeOpen = open && Boolean(anchorEl);
  const popperId = canBeOpen ? "transition-popper" : undefined;

  return (
    <ClickAwayListener onClickAway={closeMenu}>
      <Box sx={{ position: "relative" }}>
        {!isCancelling && (
          <Tooltip title="Cancel subscription" arrow placement="top">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClick}
              sx={{
                border: 1,
                borderColor: "error.main",
                borderRadius: 2,
                bgcolor: open ? "error.main" : "",
              }}
            >
              <DeleteForeverIcon color={open ? "action" : "error"} />
            </IconButton>
          </Tooltip>
        )}

        {isCancelling && (
          <Tooltip
            title="The subscription is getting canceled, please wait"
            arrow
            placement="top"
          >
            <Chip
              label="Canceling"
              size="small"
              icon={<LoopIcon />}
              color="error"
            />
          </Tooltip>
        )}

        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          transition
          placement="right-start"
          sx={{ zIndex: 1200 }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 2,
                  overflow: "hidden",
                  borderColor: "divider",
                }}
              >
                <Stack direction="column">
                  <Typography variant="body2" gutterBottom>
                    Do you really want to cancel this subscription?
                  </Typography>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                    mt={1}
                  >
                    <Button size="small" onClick={closeMenu}>
                      No
                    </Button>

                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      sx={{ flex: 1, color: "white" }}
                      onClick={cancelSubscription}
                    >
                      Yes
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            </Fade>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};
