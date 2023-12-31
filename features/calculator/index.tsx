import type { NextPage } from "next";
import { useAppContext } from "@/lib/hooks/useAppContext";
import { CalculatorProps } from "@/features/calculator/types";
import { Converter } from "./sections/Converter";
import { Featured } from "./sections/Featured";

import useSWR from "swr";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export const CalculatorPage: NextPage<CalculatorProps> = ({
  cryptoKey,
  sValueKey,
}) => {
  const { Fetcher } = useAppContext();

  const { data } = useSWR("/api/edge/converter", Fetcher, {
    refreshInterval: 60000,
    dedupingInterval: 50000,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Box width="100%" maxWidth={900} mx="auto">
        <Converter data={data} cryptoKey={cryptoKey} sValueKey={sValueKey} />
        <Featured data={data} />
      </Box>
    </Grid>
  );
};
