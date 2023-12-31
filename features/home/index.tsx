import type { NextPage } from "next";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import AssessmentIcon from "@mui/icons-material/Assessment";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import SpeedIcon from "@mui/icons-material/Speed";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import AppCard from "./components/AppCard";

export const HomePage: NextPage = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      sx={{ mt: { xs: 0, lg: 4 } }}
    >
      <Typography
        component="h1"
        variant="h4"
        align="center"
        sx={{ fontSize: { xs: 24, lg: 34 } }}
      >
        Welcome to fomplo! <br /> Community tools made with ❤️
      </Typography>

      <Grid
        container
        item
        direction="row"
        alignItems="stretch"
        spacing={4}
        sx={{ mt: { xs: 0, lg: 2 } }}
      >
        <Grid item xs={12} sm={6} lg={4}>
          <AppCard
            label="Cryptocurrency Converter"
            description="Use the easiest cryptocurrency converter/calculator."
            imgSrc="/assets/home/crypto.webp"
            url="/calculator"
            icon={<SwapHorizontalCircleIcon />}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <AppCard
            label="Signum Mining Calculator"
            description="Estimate your potential signum rewards with this simple calculator."
            imgSrc="/assets/home/miner.webp"
            url="/signum-mining-calculator"
            icon={<AssessmentIcon />}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <AppCard
            label="Signum Commitment Station"
            description="Meet the easiest way to increment your effective capacity by commiting Signa"
            imgSrc="/assets/home/commitment.webp"
            url="/signum-commitment-station"
            icon={<OfflineBoltIcon />}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <AppCard
            label="Signum Ref"
            description="Discover interesting statistics 😇"
            imgSrc="/assets/home/node.webp"
            url="/signum-ref"
            icon={<SpeedIcon />}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <AppCard
            label="Signum Subscriptions"
            description="Easily manage your crypto Auto Payments"
            imgSrc="/assets/home/subscription-banner.webp"
            url="/signum-subscriptions"
            icon={<CreditScoreIcon />}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <AppCard
            label="Signum Ecosystem"
            description="Discover the superior offerings of Signum"
            imgSrc="/assets/home/mempool.webp"
            url="https://docs.signum.network/ecosystem"
            icon={<AutoAwesomeMosaicIcon />}
            newTab
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
