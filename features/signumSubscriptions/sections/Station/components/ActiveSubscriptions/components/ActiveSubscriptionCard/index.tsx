import { useMemo } from "react";
import { Subscription } from "@signumjs/core";
import { Amount } from "@signumjs/util";
import { formatAmount } from "@/lib/utils/functions";
import { CancelSubscriptionButton } from "./components/CancelSubscriptionButton";

// @ts-ignore
import hashicon from "hashicon";
import formatDistance from "date-fns/formatDistance";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

export const ActiveSubscriptionCard = ({
  id,
  amountNQT,
  frequency,
  recipient,
  recipientRS,
  aliasName,
  tldName,
}: Subscription) => {
  const avatar = useMemo(
    () => hashicon(recipient, { size: 32 }).toDataURL(),
    [recipient]
  );

  const duration = useMemo(() => {
    const distance = formatDistance(0, frequency * 1000);

    switch (distance) {
      case "1 day":
        return "day";

      case "1 hour":
        return "hour";

      case "about 1 month":
        return "month";

      case "about 1 year":
      case "1 year":
        return "year";

      default:
        return distance;
    }
  }, [frequency]);

  const amountSigna = Amount.fromPlanck(amountNQT).getSigna();

  const recipientName = recipient === "0" ? "Burn Address 🔥" : recipientRS;

  return (
    <Card
      variant="outlined"
      sx={{
        p: 2,
        height: "100%",
        transition: "0.3s all ease",
        background: "#23272B",
        color: "white",
        "&:hover": {
          boxShadow: 20,
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={1}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={1}
        >
          <Avatar
            src={avatar}
            sx={{
              width: 32,
              height: 32,
            }}
            variant="rounded"
          />

          <Stack direction="column">
            <Typography variant="body2" fontWeight={500}>
              {recipientName}
            </Typography>

            <Tooltip title="Amount / Payment Frequency" arrow placement="top">
              <Typography
                variant="body2"
                fontWeight={500}
                sx={{ opacity: 0.8 }}
              >
                {formatAmount(amountSigna)} SIGNA / Every {duration}
              </Typography>
            </Tooltip>

            {aliasName && tldName && (
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Alias renewal fees: {`${aliasName}.${tldName}`}
              </Typography>
            )}
          </Stack>
        </Stack>

        <CancelSubscriptionButton id={id} />
      </Stack>
    </Card>
  );
};
