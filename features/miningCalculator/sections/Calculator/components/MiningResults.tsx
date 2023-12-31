import { formatAmount } from "@/lib/utils/functions";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface Props {
  commitment: number;
  calculatedStorage: number;
  pocBoost: number;
  effectiveCapacity: number;
}

export const MiningResults = ({
  commitment,
  calculatedStorage,
  pocBoost,
  effectiveCapacity,
}: Props) => {
  if (!commitment || !calculatedStorage || !pocBoost || !effectiveCapacity)
    return null;

  const signaPerTiB = formatAmount((commitment / calculatedStorage).toFixed(2));

  return (
    <Grid
      container
      item
      sx={{ borderTop: 1, borderColor: "divider" }}
      mt={2}
      spacing={2}
      alignItems="flex-start"
    >
      <Grid item xs={12} lg={4}>
        <Stat label="Signa committed per TiB" value={signaPerTiB} />
      </Grid>

      <Grid item xs={12} lg={4}>
        <Stat label="PoC+ Boost Factor" value={pocBoost} />
      </Grid>

      <Grid item xs={12} lg={4}>
        <Stat
          label="Effective capacity"
          value={formatAmount(effectiveCapacity) + " TiB"}
        />
      </Grid>
    </Grid>
  );
};

interface StatProps {
  label: string;
  value: string | number;
}

const Stat = ({ label, value }: StatProps) => (
  <Grid
    container
    item
    direction="column"
    alignItems="center"
    justifyContent="flex-start"
  >
    <Typography align="center">{label}</Typography>

    <Typography
      align="center"
      fontWeight={700}
      fontSize={18}
      sx={{ opacity: 0.9 }}
    >
      {value}
    </Typography>
  </Grid>
);
