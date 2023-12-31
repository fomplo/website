import type { NextPage } from "next";
import { useAppContext } from "@/lib/hooks/useAppContext";
import { BlockchainInfo } from "./sections/BlockchainInfo";
import { FeesInfo } from "./sections/FeesInfo";
import { Statistics } from "./sections/Statistics";

import useSWR from "swr";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const SignumRefPage: NextPage = () => {
  const { Fetcher } = useAppContext();

  const { data, isLoading } = useSWR("/api/edge/network", Fetcher, {
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
        <Typography
          component="h1"
          variant="h5"
          fontWeight={700}
          sx={{ width: "100%", textAlign: { xs: "center", lg: "left" } }}
          gutterBottom
        >
          Signum Ref
        </Typography>

        <FeesInfo data={data} loading={isLoading} />

        <Statistics data={data} loading={isLoading} />
      </Grid>

      <Grid item xs={12} lg={4} sx={{ pl: { xs: 0, lg: 2 } }}>
        <BlockchainInfo data={data} loading={isLoading} />
      </Grid>
    </Grid>
  );
};
