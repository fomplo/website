import { useAppSelector } from "@/states/hooks";
import { useAccount } from "@/lib/hooks/useAccount";
import { useAppContext } from "@/lib/hooks/useAppContext";
import { selectIsWalletConnected } from "@/lib/states/walletState";
import { formatAmount } from "@/lib/utils/functions";
import { DefaultContainer } from "@/lib/components/Cards/DefaultContainer";
import { AccountCard } from "@/lib/components/AccountCard";

import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {
  loading: boolean;
}

export const Summary = ({ loading }: Props) => {
  const { totalBalance, availableBalance, committedBalance } = useAccount();
  const { IsClientSide } = useAppContext();
  const isWalletConnected = useAppSelector(selectIsWalletConnected);

  if (!isWalletConnected) return null;

  if (loading && isWalletConnected) return <LoadingState />;

  const percentage = (committedBalance / totalBalance) * 100 || 0;
  const percentageCommitted = percentage.toFixed(2) || 0;

  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      sx={{ mt: { xs: 2, lg: 4 } }}
    >
      <Grid item container direction="row" alignItems="center" mb={1.5}>
        <AccountCard />
      </Grid>

      <Grid item container mb={2}>
        <DefaultContainer>
          <Typography variant="h6" color="textSecondary" align="center">
            Balance Summary
          </Typography>

          {IsClientSide && window && (
            <div style={{ width: 100, margin: "auto" }}>
              <CircularProgressbar
                value={percentage}
                text={percentage ? percentageCommitted + "%" : "0%"}
                circleRatio={0.75}
                styles={buildStyles({
                  rotation: 1 / 2 + 1 / 8,
                  strokeLinecap: "butt",
                  trailColor: "#eee",
                })}
              />
            </div>
          )}

          {!!percentage && (
            <Typography fontWeight={700} align="center">
              {percentageCommitted}% of the balance is committed
            </Typography>
          )}

          {!percentage && (
            <Typography fontSize={15} fontWeight={700} align="center">
              The account does not have SIGNA committed
            </Typography>
          )}
        </DefaultContainer>
      </Grid>

      <Grid item container mb={2}>
        <DefaultContainer>
          <Typography
            variant="h6"
            color="textSecondary"
            align="center"
            gutterBottom
          >
            Available Balance
          </Typography>

          <Typography variant="h5" fontWeight={700} align="center">
            Ꞩ {formatAmount(availableBalance)}
          </Typography>
        </DefaultContainer>
      </Grid>

      <Grid item container mb={2}>
        <DefaultContainer>
          <Typography
            variant="h6"
            color="textSecondary"
            align="center"
            gutterBottom
          >
            Effective Committed Balance
          </Typography>

          <Typography variant="h5" fontWeight={700} align="center">
            Ꞩ {formatAmount(committedBalance)}
          </Typography>
        </DefaultContainer>
      </Grid>
    </Grid>
  );
};

const LoadingState = () => (
  <Grid
    container
    item
    direction="row"
    alignItems="center"
    justifyContent="center"
    sx={{ mt: { xs: 2, lg: 10.5 } }}
  >
    <Skeleton
      variant="rectangular"
      width="100%"
      height={123}
      sx={{ borderRadius: 1, mb: 2 }}
    />

    <Skeleton
      variant="rectangular"
      width="100%"
      height={123}
      sx={{ borderRadius: 1, mb: 2 }}
    />

    <Skeleton
      variant="rectangular"
      width="100%"
      height={123}
      sx={{ borderRadius: 1, mb: 2 }}
    />
  </Grid>
);
