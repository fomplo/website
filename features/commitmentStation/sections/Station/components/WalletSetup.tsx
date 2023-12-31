import { DefaultContainer } from "@/lib/components/Cards/DefaultContainer";
import { requestWalletConnection } from "@/lib/utils/requestWalletConnection";
import { CtaCard } from "@/lib/components/CtaCard";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HubIcon from "@mui/icons-material/Hub";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaymentsIcon from "@mui/icons-material/Payments";

export const WalletSetup = () => (
  <DefaultContainer>
    <Grid container direction="row" alignItems="center" spacing={2} mb={2}>
      <Grid item xs={12} md={4}>
        <CtaCard
          icon={<HubIcon />}
          label="Simple Commitment 😀"
          description="Easily mange your Signum Commitment for Mining"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <CtaCard
          icon={<AccountBalanceWalletIcon />}
          label="Simple Connection 🚀"
          description="You just need to connect your account with the XT Wallet"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <CtaCard
          icon={<PaymentsIcon />}
          label="Easy Management 😎"
          description="You decide if you want to commit or uncommit SIGNA"
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
