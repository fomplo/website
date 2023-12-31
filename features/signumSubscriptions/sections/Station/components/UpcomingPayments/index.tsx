import { useMemo } from "react";
import { Amount } from "@signumjs/util";
import { formatAmount } from "@/lib/utils/functions";
import { DefaultContainer } from "@/lib/components/Cards/DefaultContainer";
import { ComponentProps } from "../../types/ComponentProps";

// @ts-ignore
import hashicon from "hashicon";
import format from "date-fns/format";
import differenceInDays from "date-fns/differenceInDays";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export const UpcomingPayments = ({ accountSubscriptions }: ComponentProps) => {
  const currentDate = new Date();

  const upcomingSubscriptions = useMemo(() => {
    const formmatedSubscriptions = accountSubscriptions
      .map((subscription) => {
        const { id, recipient, recipientRS, amountNQT, timeNext } =
          subscription;

        const avatar = hashicon(recipient, { size: 32 }).toDataURL();

        return {
          id,
          avatar,
          recipientRS,
          amount: Amount.fromPlanck(amountNQT).getSigna(),
          nextPaymentDate: new Date(
            Date.UTC(2014, 7, 11, 2, 0, 0, 0) + timeNext * 1000
          ),
        };
      })
      // Show subscriptions which have at least has 10 days left of payment
      .filter((subscription) => {
        if (differenceInDays(subscription.nextPaymentDate, currentDate) <= 10) {
          return true;
        }

        return false;
      });

    // Sort subscription with nearer payment date
    return formmatedSubscriptions.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return a.nextPaymentDate.getTime() - b.nextPaymentDate.getTime();
    });
  }, [accountSubscriptions]);

  if (!upcomingSubscriptions.length) return null;

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
          Upcoming Payments
        </Typography>
      </Grid>

      <Grid item container>
        <DefaultContainer>
          <TableContainer>
            <Table sx={{ minWidth: 600 }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight={500} color="textSecondary">
                      Subscription
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography fontWeight={500} color="textSecondary">
                      Amount
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography fontWeight={500} color="textSecondary">
                      Next Payment Date
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {upcomingSubscriptions.map((subscription) => (
                  <TableRow
                    key={subscription.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar
                          src={subscription.avatar}
                          sx={{
                            width: 32,
                            height: 32,
                          }}
                          variant="rounded"
                        />

                        <Typography variant="body2" fontWeight={500}>
                          {subscription.recipientRS}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell align="right">
                      <Typography variant="body2" fontWeight={500}>
                        {formatAmount(subscription.amount)} SIGNA
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Typography variant="body2" fontWeight={500}>
                        {formatDistanceToNow(subscription.nextPaymentDate, {
                          addSuffix: true,
                        })}{" "}
                        <Typography
                          component="span"
                          color="textSecondary"
                          fontSize={13}
                          fontWeight={700}
                        >
                          (
                          {format(subscription.nextPaymentDate, "EEE, MMMM dd")}
                          )
                        </Typography>
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DefaultContainer>
      </Grid>
    </Grid>
  );
};
