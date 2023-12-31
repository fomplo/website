import { DefaultContainer } from "@/lib/components/Cards/DefaultContainer";
import { requestWalletConnection } from "@/lib/utils/requestWalletConnection";
import { CtaCard } from "@/lib/components/CtaCard";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HubIcon from "@mui/icons-material/Hub";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export const WalletSetup = () => (
  <DefaultContainer>
    <Grid container direction="row" alignItems="center" spacing={2} mb={2}>
      <Grid item xs={12} md={6}>
        <CtaCard
          icon={<HubIcon />}
          label="Manage your Recurring Payments"
          description="Easily view and manage your auto payments on the Signum blockchain"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CtaCard
          icon={<PaymentsIcon />}
          label="You're the boss"
          description="You decide whenever you want to create or cancel a subscription with just a few clicks."
        />
      </Grid>
    </Grid>

    <Typography variant="h6" color="textSecondary" align="center" gutterBottom>
      Connect your account with Signum XT Wallet
    </Typography>

    <Button
      variant="contained"
      color="primary"
      fullWidth
      sx={{
        textTransform: "none",
        my: 1,
        py: 1,
        color: "#ffffff",
        maxWidth: 400,
        display: "flex",
        mx: "auto",
      }}
      startIcon={<AccountBalanceWalletIcon />}
      onClick={requestWalletConnection}
    >
      Connect Wallet
    </Button>
  </DefaultContainer>
);
