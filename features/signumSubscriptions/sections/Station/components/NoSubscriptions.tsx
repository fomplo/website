import { DefaultContainer } from "@/lib/components/Cards/DefaultContainer";

import Image from "next/image";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface Props {
  openSubscriptionModal: () => void;
}

export const NoSubscriptions = ({ openSubscriptionModal }: Props) => {
  return (
    <DefaultContainer>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Image
          src={"/assets/pages/subscription/meme-john-animated.webp"}
          alt="Fomplo"
          width={251}
          height={187}
          unoptimized
          style={{ borderRadius: "1rem", background: "rgba(0,0,0,0.05)" }}
        />

        <Typography
          variant="h6"
          color="textSecondary"
          align="center"
          fontWeight={700}
          gutterBottom
        >
          This account does not have subscriptions
        </Typography>

        <Button
          onClick={openSubscriptionModal}
          startIcon={<AddCircleIcon />}
          variant="contained"
          sx={{ textTransform: "none" }}
        >
          Create a New Subscription
        </Button>
      </Stack>
    </DefaultContainer>
  );
};
