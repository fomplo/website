import { formatAmount } from "@/lib/utils/functions";
import { StatCard } from "@/lib/components/StatCard";

import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

interface Props {
  data: any;
  loading?: boolean;
}

export const BlockchainInfo = ({ data, loading = true }: Props) => {
  if (loading) return <LoadingState />;

  const latestBlock = formatAmount(data.blockHeight);

  const latestTestnetBlock = formatAmount(data.testnetBlockHeight);

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      sx={{ mt: { xs: 2, lg: 3 } }}
    >
      <Grid item xs={12}>
        <StatCard title="Latest Block" value={latestBlock} />
      </Grid>

      <Grid item xs={12}>
        <StatCard title="Latest Testnet Block" value={latestTestnetBlock} />
      </Grid>

      <Grid item xs={12}>
        <StatCard title="Latest Node Version" value={data.version} />
      </Grid>
    </Grid>
  );
};

const LoadingState = () => (
  <Grid
    container
    direction="column"
    spacing={2}
    px={2}
    sx={{ mt: { xs: 2, lg: 3 } }}
  >
    <Grid item>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={90}
        sx={{ borderRadius: 2 }}
      />
    </Grid>

    <Grid item>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={90}
        sx={{ borderRadius: 2 }}
      />
    </Grid>

    <Grid item>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={90}
        sx={{ borderRadius: 2 }}
      />
    </Grid>
  </Grid>
);
