import { formatAmount } from "@/lib/utils/functions";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

interface Props {
  signa: number;
  usd: number;
}

export const ProfitResults = ({ signa, usd }: Props) => {
  if (!signa) return null;

  return (
    <Grid
      container
      direction="row"
      alignItems="flex-start"
      justifyContent="space-between"
      spacing={2}
      mt={0.5}
    >
      <Grid item xs={12} lg={4}>
        <Stat
          label="Daily Earnings"
          signaReward={formatAmount(signa)}
          usdReward={formatAmount(usd)}
        />
      </Grid>

      <Grid item xs={12} lg={4}>
        <Stat
          label="Weekly Earnings"
          signaReward={formatAmount(signa * 7)}
          usdReward={formatAmount(usd * 7)}
        />
      </Grid>

      <Grid item xs={12} lg={4}>
        <Stat
          label="Monthly Earnings"
          signaReward={formatAmount(signa * 30)}
          usdReward={formatAmount(usd * 30)}
        />
      </Grid>
    </Grid>
  );
};

interface StatProps {
  label: string;
  signaReward: string;
  usdReward: string;
}

const Stat = ({ label, signaReward, usdReward }: StatProps) => (
  <Paper
    variant="outlined"
    sx={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      pb: 1,
      borderRadius: 2,
      overflow: "hidden",
    }}
  >
    <Typography
      fontWeight={500}
      align="center"
      sx={{ width: "100%", background: "rgba(0,0,0,.05)", py: 1, mb: 1 }}
    >
      {label}
    </Typography>

    <Typography fontWeight={700} fontSize={18}>
      {signaReward}
    </Typography>
    <Typography>SIGNA</Typography>

    <Divider flexItem sx={{ my: 1 }} />

    <Typography fontWeight={700} fontSize={18}>
      {"$" + usdReward}
    </Typography>
    <Typography>USD</Typography>
  </Paper>
);
