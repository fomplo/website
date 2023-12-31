import type { NextPage } from "next";
import { useAppContext } from "@/lib/hooks/useAppContext";
import { Calculator } from "./sections/Calculator";
import { BlockchainInfo } from "./sections/BlockchainInfo";

import useSWR from "swr";
import Grid from "@mui/material/Grid";

export const MiningCalculatorPage: NextPage = () => {
  const { Fetcher } = useAppContext();

  const { data } = useSWR("/api/edge/mining", Fetcher, {
    refreshInterval: 60000,
    dedupingInterval: 50000,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <Grid
      container
      direction="row"
      alignItems="flex-start"
      justifyContent="space-between"
      maxWidth={1200}
      mx="auto"
      mt={2}
    >
      <Grid item xs={12} lg={8}>
        <Calculator data={data} />
      </Grid>

      <Grid item xs={12} lg={4} sx={{ pl: { xs: 0, lg: 2 } }}>
        <BlockchainInfo data={data} />
      </Grid>
    </Grid>
  );
};
