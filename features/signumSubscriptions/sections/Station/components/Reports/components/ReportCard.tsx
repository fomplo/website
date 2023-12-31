import { formatAmount } from "@/lib/utils/functions";

import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

interface Props {
  loading: boolean;
  label: string;
  amount: number;
}

export const ReportCard = ({ loading, label, amount }: Props) => (
  <Paper
    variant="outlined"
    sx={{
      position: "relative",
      p: 2,
      borderRadius: 2,
    }}
  >
    {loading && (
      <Skeleton
        variant="rectangular"
        width="100%"
        height={93}
        sx={{ borderRadius: 2 }}
      />
    )}

    {!loading && (
      <Stack
        width="100%"
        direction="column"
        alignItems="flex-start"
        justifyContent="center"
      >
        <Typography color="textSecondary">{label}</Typography>

        <Typography variant="h6">{formatAmount(amount)} SIGNA</Typography>
      </Stack>
    )}
  </Paper>
);
