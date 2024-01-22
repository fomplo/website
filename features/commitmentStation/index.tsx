import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { Block, Transaction } from "@signumjs/core";
import { useAppContext } from "@/lib/hooks/useAppContext";
import { useAccount } from "@/lib/hooks/useAccount";
import { useLedger } from "@/lib/hooks/useLedger";
import { useSnackbar } from "@/lib/hooks/useSnackbar";
import { useAppSelector } from "@/states/hooks";
import {
  selectIsWalletConnected,
  selectWalletNodeHost,
} from "@/lib/states/walletState";
import { PageNotAvailable } from "@/lib/components/PageNotAvailable";
import { CashBack } from "@/lib/components/CashBack";
import { VideoEmbed } from "@/lib/components/VideoEmbed";
import { Station } from "./sections/Station";
import { Summary } from "./sections/Summary";

import useSWR from "swr";
import Grid from "@mui/material/Grid";

export const CommitmentStationPage: NextPage = () => {
  const { showError } = useSnackbar();
  const { Fetcher, IsMobile } = useAppContext();
  const { accountId } = useAccount();
  const isWalletConnected = useAppSelector(selectIsWalletConnected);
  const walletNodeHost = useAppSelector(selectWalletNodeHost);
  const ledger = useLedger();

  const [isSSR, setIsSSR] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [accountBlocks, setBlocks] = useState<Block[]>([]);
  const [currentBlockHeight, setCurrentBlockHeight] = useState(0);

  const [
    accountAddCommitmentTransactions,
    setAccountAddCommitmentTransactions,
  ] = useState<Transaction[]>([]);

  const { data: networkData } = useSWR("/api/edge/network", Fetcher, {
    refreshInterval: 60000,
    dedupingInterval: 50000,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const accountBalanceUrl =
    walletNodeHost && isWalletConnected && walletNodeHost && accountId
      ? `/account/${accountId}`
      : undefined;

  const { data } = useSWR(
    accountBalanceUrl,
    async () => {
      if (!ledger || !accountId) return;

      try {
        const { blocks } = await ledger.account.getAccountBlocks({
          accountId,
          firstIndex: 0,
          lastIndex: 0,
        });

        const { transactions } = await ledger.account.getAccountTransactions({
          accountId,
          firstIndex: 0,
          lastIndex: 0,
          type: 20, // Mining-related transactions
          subtype: 1, // Add commitment sub-type
        });

        return {
          blocks,
          transactions,
        };
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

  useEffect(() => {
    if (!data || !networkData?.blockHeight) return setIsLoading(true);
    setIsLoading(false);

    setCurrentBlockHeight(Number(networkData.blockHeight));

    setBlocks(data.blocks);
    setAccountAddCommitmentTransactions(data.transactions);
  }, [data, networkData]);

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
        <Grid container item xs={12} lg={8} gap={2}>
          <Station
            loading={isLoading}
            currentBlockHeight={currentBlockHeight}
            accountBlocks={accountBlocks}
            accountAddCommitmentTransactions={accountAddCommitmentTransactions}
          />

          {!isLoading && <CashBack />}
        </Grid>

        <Grid item xs={12} lg={4} sx={{ pl: { xs: 0, lg: 2 } }}>
          <Summary loading={isLoading} />

          <VideoEmbed
            href="https://youtu.be/p-jEkv3aGAs?si=5dfF-wCm5dr8-Bn1"
            imgSrc="/assets/pages/commitment/signum-commitment.webp"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
