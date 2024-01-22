import { useState, useEffect } from "react";
import { formatAmount } from "@/lib/utils/functions";
import { StatCard } from "@/lib/components/StatCard";
import { VideoEmbed } from "@/lib/components/VideoEmbed";

import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

interface Props {
  data: any;
}

export const BlockchainInfo = ({ data }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  // Initial loading for the first visit
  useEffect(() => {
    if (data) setIsLoading(false);
  }, [data]);

  if (isLoading) return <LoadingState />;

  const blockReward = data.blockReward + " SIGNA";

  const commitment =
    formatAmount((data.averageCommitment / 1e8).toFixed(0)) + " SIGNA per TiB";

  const price = "$" + data.price;

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      sx={{ mt: { xs: 2, lg: 3 } }}
    >
      <Grid item xs={12}>
        <StatCard title="Block Reward" value={blockReward} />
      </Grid>

      <Grid item xs={12}>
        <StatCard title="Avg. Commitment" value={commitment} />
      </Grid>

      <Grid item xs={12}>
        <StatCard title="Signum Price (USD)" value={price} />
      </Grid>

      <Grid item xs={12}>
        <VideoEmbed
          href="https://youtu.be/zeIVCKN6Kpo?si=Ba2C7QXwMfvJy6wF"
          imgSrc="/assets/pages/mining/signum-mining.webp"
        />
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
