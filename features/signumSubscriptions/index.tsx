import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useAppContext } from "@/lib/hooks/useAppContext";
import { useAccount } from "@/lib/hooks/useAccount";
import { useLedger } from "@/lib/hooks/useLedger";
import { useSnackbar } from "@/lib/hooks/useSnackbar";
import { useAppSelector } from "@/states/hooks";
import { PageNotAvailable } from "@/lib/components/PageNotAvailable";
import {
  selectIsWalletConnected,
  selectWalletNodeHost,
} from "@/lib/states/walletState";
import { Station } from "./sections/Station";
import { Summary } from "./sections/Summary";

import useSWR from "swr";
import Grid from "@mui/material/Grid";

export const SignumSubscriptionsPage: NextPage = () => {
  const { showError } = useSnackbar();
  const { accountId } = useAccount();
  const { IsMobile } = useAppContext();
  const isWalletConnected = useAppSelector(selectIsWalletConnected);
  const walletNodeHost = useAppSelector(selectWalletNodeHost);
  const ledger = useLedger();

  const [isSSR, setIsSSR] = useState(true);

  const accountSubscriptionsUrl =
    walletNodeHost && isWalletConnected && walletNodeHost && accountId
      ? `/account/${accountId}/subscriptions`
      : undefined;

  const { data: accountSubscriptions, isLoading } = useSWR(
    accountSubscriptionsUrl,
    async () => {
      if (!ledger || !accountId) return [];

      try {
        const { subscriptions } = await ledger.account.getAccountSubscriptions(
          accountId
        );

        return subscriptions;
      } catch (e: any) {
        showError(e);
        return;
      }
    },
    {
      refreshInterval: 60000,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (!isSSR && IsMobile) return <PageNotAvailable />;

  return (
    <Grid
      container
      item
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Grid
        item
        container
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        mx="auto"
        mt={2}
      >
        <Grid item xs={12} lg={8}>
          <Station
            loading={isLoading}
            accountSubscriptions={accountSubscriptions || []}
          />
        </Grid>

        <Grid item xs={12} lg={4} sx={{ pl: { xs: 0, lg: 2 } }}>
          <Summary loading={isLoading} />
        </Grid>
      </Grid>
    </Grid>
  );
};
