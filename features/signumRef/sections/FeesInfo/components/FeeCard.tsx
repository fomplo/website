import { Amount } from "@signumjs/util";
import { formatAmount } from "@/lib/utils/functions";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";

interface Props {
  signaFee: string;
  price: string;
  labelFee: string;
  loading: boolean;
  background: string;
}

export const FeeCard = ({
  signaFee,
  price,
  labelFee,
  loading,
  background,
}: Props) => {
  const signaPrice = Amount.fromPlanck(signaFee || "0").getSigna();

  const signaPriceToUsd = Number(signaPrice) * Number(price);

  return (
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
          height={93}
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
          <PaidOutlinedIcon
            sx={{
              color: "white",
              position: "absolute",
              right: 0,
              bottom: 0,
              fontSize: 110,
              opacity: 0.05,
            }}
          />

          <PaidOutlinedIcon
            sx={{
              color: "white",
              position: "absolute",
              left: 0,
              bottom: "25%",
              fontSize: 62,
              opacity: 0.05,
            }}
          />

          <Typography fontWeight="inherit" color="inherit" variant="h6">
            {formatAmount(signaPrice)} SIGNA
          </Typography>

          <Chip
            color="info"
            variant="filled"
            sx={{
              color: "white",
              fontSize: 15,
              ":hover": { background: "rgba(0,0,0,1)" },
              zIndex: 9,
              mb: 0.5,
            }}
            label={
              "$" +
              Intl.NumberFormat("en", {
                style: "decimal",

                maximumFractionDigits: 8,
              }).format(signaPriceToUsd) +
              " USD"
            }
          />

          <Typography fontWeight="inherit" color="inherit">
            {labelFee}
          </Typography>
        </Stack>
      )}
    </Paper>
  );
};
