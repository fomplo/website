import { ComponentProps } from "../../types/ComponentProps";
import { ActiveSubscriptionCard } from "./components/ActiveSubscriptionCard";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const ActiveSubscriptions = ({
  accountSubscriptions,
}: ComponentProps) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      mb={2}
    >
      <Grid item>
        <Typography
          variant="h6"
          textAlign="left"
          color="textSecondary"
          gutterBottom
        >
          Active Subscriptions
        </Typography>
      </Grid>

      <Grid
        item
        container
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        spacing={2}
      >
        {accountSubscriptions.map((subscription) => (
          <Grid key={subscription.id} item xs={12} md={6}>
            <ActiveSubscriptionCard {...subscription} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
