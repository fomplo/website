import { useAppDispatch } from "@/states/hooks";
import { actions } from "@/lib/states/appState";

import Link from "next/link";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import AssessmentIcon from "@mui/icons-material/Assessment";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import SpeedIcon from "@mui/icons-material/Speed";
import ShareIcon from "@mui/icons-material/Share";
import MenuLink from "./components/MenuLink";

const NavigationMenu = () => {
  const { setIsOpenShareModal } = actions;
  const dispatch = useAppDispatch();
  const openShareDialog = () => dispatch(setIsOpenShareModal(true));

  return (
    <Grid
      container
      item
      direction="column"
      justifyContent="space-between"
      alignItems="flex-start"
      maxWidth={800}
      maxHeight={1080}
      mx="auto"
      height="100%"
      flexWrap="nowrap"
      sx={{ overflowY: "auto", pb: { xs: 0, lg: 2 } }}
    >
      <Grid
        container
        item
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <MenuLink
          label="Crypto Converter Calculator"
          url="/calculator"
          icon={<SwapHorizontalCircleIcon />}
        />

        <MenuLink
          label="Signum Mining Calculator"
          url="/signum-mining-calculator"
          icon={<AssessmentIcon />}
        />

        <MenuLink
          label="Signum Commitment Station"
          url="/signum-commitment-station"
          icon={<OfflineBoltIcon />}
        />

        <MenuLink label="Signum Ref" url="/signum-ref" icon={<SpeedIcon />} />

        <MenuLink
          label="Signum Subscriptions"
          url="/signum-subscriptions"
          icon={<CreditScoreIcon />}
        />

        <MenuLink
          label="Signum Ecosystem"
          url="https://docs.signum.network/ecosystem"
          icon={<AutoAwesomeMosaicIcon />}
          newTab
        />

        <MenuLink
          label="Donations"
          url="/donations"
          icon={<FavoriteIcon color="error" />}
        />
      </Grid>

      <Grid
        container
        item
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        rowSpacing={2}
      >
        <Grid container item direction="row" spacing={2}>
          <Grid item xs={12}>
            <Button
              startIcon={<ShareIcon />}
              fullWidth
              variant="contained"
              sx={{ background: "#121212", textTransform: "none" }}
              onClick={openShareDialog}
            >
              Share
            </Button>

            <Link href="https://github.com/ipr0310" target="_blank">
              <Typography
                align="center"
                sx={{ display: "inline-block", width: "100%", mt: 1 }}
                variant="body2"
                color="textSecondary"
                fontWeight={700}
              >
                Made with ⚡ By ipr0310
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NavigationMenu;
