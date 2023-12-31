import { formatAmount } from "@/lib/utils/functions";

import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import WidgetsIcon from "@mui/icons-material/Widgets";

interface Props {
  label: string;
  value: string;
  loading: boolean;
  background: string;
}

export const KpiCard = ({ label, value, loading, background }: Props) => (
  <Paper
    variant="outlined"
    sx={{
      position: "relative",
      p: 2,
      borderRadius: 2,
      background,
    }}
  >
    {loading && (
      <Skeleton
        variant="rectangular"
        width="100%"
        height={64}
        sx={{ borderRadius: 2 }}
      />
    )}

    {!loading && (
      <Stack
        width="100%"
        direction="column"
        alignItems="center"
        justifyContent="center"
        fontWeight={700}
        color="white"
      >
        <WidgetsIcon
          sx={{
            color: "white",
            position: "absolute",
            right: 0,
            bottom: 0,
            fontSize: 110,
            opacity: 0.05,
          }}
        />

        <Typography fontWeight="inherit" color="inherit" variant="h6">
          {label}
        </Typography>

        <Typography fontWeight="inherit" color="inherit" variant="h5">
          {formatAmount(value)}
        </Typography>
      </Stack>
    )}
  </Paper>
);
