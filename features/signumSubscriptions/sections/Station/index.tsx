import { useMemo, useState } from "react";
import { Subscription } from "@signumjs/core";
import { useAccount } from "@/lib/hooks/useAccount";
import { useAppSelector } from "@/states/hooks";
import { selectIsWalletConnected } from "@/lib/states/walletState";
import { WalletSetup } from "./components/WalletSetup";
import { NoSubscriptions } from "./components/NoSubscriptions";
import { LoadingIndicator } from "./components/LoadingIndicator";
import { Reports } from "./components/Reports";
import { UpcomingPayments } from "./components/UpcomingPayments";
import { ActiveSubscriptions } from "./components/ActiveSubscriptions";
import { CreateSubscriptionModal } from "./components/CreateSubscriptionModal";

import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface Props {
  loading: boolean;
  accountSubscriptions: Subscription[];
}

export const Station = ({ loading, accountSubscriptions }: Props) => {
  const { accountId } = useAccount();

  const isWalletConnected = useAppSelector(selectIsWalletConnected);

  const [isOpenCreateSubscriptionModal, setIsOpenCreateSubscriptionModal] =
    useState(false);

  const openCreateSubscriptionModal = () =>
    setIsOpenCreateSubscriptionModal(true);

  const closeCreateSubscriptionModal = () =>
    setIsOpenCreateSubscriptionModal(false);

  const subscriptions = useMemo(
    () =>
      accountSubscriptions.filter(
        (accountSubscription) => accountSubscription.sender === accountId
      ),
    [accountSubscriptions, accountId]
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
        Signum Subscriptions
      </Typography>

      {!isWalletConnected && <WalletSetup />}

      {isWalletConnected && loading && <LoadingIndicator />}

      {isWalletConnected && !loading && (
        <CreateSubscriptionModal
          open={isOpenCreateSubscriptionModal}
          handleClose={closeCreateSubscriptionModal}
        />
      )}

      {isWalletConnected && !loading && !subscriptions.length && (
        <NoSubscriptions openSubscriptionModal={openCreateSubscriptionModal} />
      )}

      {isWalletConnected && !loading && !!subscriptions.length && (
        <Stack
          width="100%"
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <Alert
            color="info"
            action={
              <Button
                color="inherit"
                size="small"
                variant="outlined"
                onClick={openCreateSubscriptionModal}
                sx={{ textTransform: "none" }}
                startIcon={<AddCircleIcon />}
              >
                Create Subscription
              </Button>
            }
            sx={{ width: "100%" }}
          >
            Signum lets you create all the subscriptions you want!
          </Alert>

          {subscriptions.length > 1 && (
            <Reports loading={loading} accountSubscriptions={subscriptions} />
          )}

          <UpcomingPayments
            loading={loading}
            accountSubscriptions={subscriptions}
          />

          <ActiveSubscriptions
            loading={loading}
            accountSubscriptions={subscriptions}
          />
        </Stack>
      )}
    </Grid>
  );
};
