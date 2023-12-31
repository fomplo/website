import { formatAmount } from "@/lib/utils/functions";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface Props {
  label: string;
  value: string;
  background: string;
}

export const StatCard = ({ label, value, background }: Props) => (
  <Grid
    container
    px={1}
    py={2}
    borderRadius={1}
    sx={{ background }}
    direction="column"
  >
    <Typography color="white">{label}</Typography>

    <Typography color="white" variant="h6" fontWeight={700}>
      {formatAmount(value)}
    </Typography>
  </Grid>
);
