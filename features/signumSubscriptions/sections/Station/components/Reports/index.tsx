import { useMemo } from "react";
import { Amount } from "@signumjs/util";
import { ReportCard } from "./components/ReportCard";
import { ComponentProps } from "../../types/ComponentProps";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const Reports = ({ accountSubscriptions, loading }: ComponentProps) => {
  const reportValues = useMemo(() => {
    let recurringExpenses = 0;
    let mostExpensiveSubscription = 0;
    let mostCheapSubscription = 0;

    const subscriptions = accountSubscriptions
      .map((subscription) =>
        Number(Amount.fromPlanck(subscription.amountNQT || "0").getSigna())
      )
      .sort((a, b) => a - b);

    recurringExpenses = subscriptions.reduce((a, b) => a + b, 0);
    mostExpensiveSubscription = subscriptions[subscriptions.length - 1] || 0;
    mostCheapSubscription = subscriptions[0] || 0;

    return {
      recurringExpenses,
      mostExpensiveSubscription,
      mostCheapSubscription,
    };
  }, [accountSubscriptions]);

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
        gutterBottom
      >
        Reports
      </Typography>

      <Grid
        container
        item
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12} sm={4}>
          <ReportCard
            loading={loading}
            label="Recurring Expenses"
            amount={reportValues.recurringExpenses}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <ReportCard
            loading={loading}
            label="Most Expensive Subscription"
            amount={reportValues.mostExpensiveSubscription}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <ReportCard
            loading={loading}
            label="Most Affordable Subscription"
            amount={reportValues.mostCheapSubscription}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
