import { useMemo } from "react";
import { useAppSelector } from "@/states/hooks";
import { useAccount } from "@/lib/hooks/useAccount";
import { selectIsWalletConnected } from "@/lib/states/walletState";
import { selectMonitoredTransactions } from "@/lib/states/transactionState";
import { formatAmount } from "@/lib/utils/functions";
import { DefaultContainer } from "@/lib/components/Cards/DefaultContainer";
import { AccountCard } from "@/lib/components/AccountCard";
import { CashBack } from "@/lib/components/CashBack";
import { LoopIcon } from "@/lib/components/LoopIcon";

import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

interface Props {
  loading: boolean;
}

export const Summary = ({ loading }: Props) => {
  const { availableBalance } = useAccount();
  const isWalletConnected = useAppSelector(selectIsWalletConnected);
  const monitoredTransactions = useAppSelector(selectMonitoredTransactions);

  const isCreating = useMemo(() => {
    return Boolean(
      monitoredTransactions.find(({ type }) => type === "subscription-creation")
    );
  }, [monitoredTransactions]);

  if (!isWalletConnected) return null;

  if (loading && isWalletConnected) return <LoadingState />;

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

      <Grid item container>
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

      {isCreating && (
        <Grid
          item
          container
          mt={2}
          p={1}
          sx={{ background: "#121212", borderRadius: 2 }}
        >
          <Chip
            label="New subscription is being created..."
            size="small"
            sx={{ width: "100%" }}
            icon={<LoopIcon />}
            color="info"
          />
        </Grid>
      )}

      <Grid item mb={2}>
        <CashBack />
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
  </Grid>
);
