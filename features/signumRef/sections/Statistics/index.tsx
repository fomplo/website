import { DefaultContainer } from "@/lib/components/Cards/DefaultContainer";
import { KpiCard } from "./components/KpiCard";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface Props {
  data: any;
  loading: boolean;
}

export const Statistics = ({ data, loading }: Props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      <Typography
        variant="h6"
        textAlign="left"
        color="textSecondary"
        fontWeight={500}
        gutterBottom
      >
        Statistics{" "}
        <Typography component="span" fontSize={14} fontWeight="500">
          (Since Genesis Block. 2014)
        </Typography>
      </Typography>

      <DefaultContainer>
        <Grid
          container
          item
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} sm={6}>
            <KpiCard
              loading={loading}
              value={!loading ? data.totalTransactions : ""}
              label="Total Transactions"
              background="#11998e"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <KpiCard
              loading={loading}
              value={!loading ? data.tokensCreated : ""}
              label="Tokens Created"
              background="#FC5C7D"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <KpiCard
              loading={loading}
              value={!loading ? data.smartContractsCreated : ""}
              label="Smart Contracts Created"
              background="#cc5333"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <KpiCard
              loading={loading}
              value={!loading ? data.aliasesCreated : ""}
              label="Aliases Minted"
              background="#7E7B52"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <KpiCard
              loading={loading}
              value={!loading ? data.subscriptionsCreated : ""}
              label="Subscriptions Created"
              background="#49678D"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <KpiCard
              loading={loading}
              value={!loading ? data.subscriptionPaymentsCount : ""}
              label="Subscription Payments Processed"
              background="#24243e"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <KpiCard
              loading={loading}
              value={!loading ? data.circulatingFunds : ""}
              label="SIGNA in circulation"
              background="#1C542D"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <KpiCard
              loading={loading}
              value={!loading ? data.burnedFunds : ""}
              label="Total of SIGNA Burned 🔥"
              background="#B32428"
            />
          </Grid>
        </Grid>
      </DefaultContainer>
    </Grid>
  );
};
