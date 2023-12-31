import { openExternalUrl } from "@/lib/utils/functions";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export const CashBack = () => {
  const openCashBackDocumentation = () =>
    openExternalUrl("https://docs.signum.network/signum/activate-cashback");

  return (
    <Grid
      container
      mt={2}
      p={2}
      direction="column"
      sx={{ background: "#121212", borderRadius: 2 }}
    >
      <Alert severity="success">
        <AlertTitle>Awesome news 🎉</AlertTitle>
        If you conduct transactions <strong>in your own node,</strong> you will
        get a<strong> 25% cashback on paid transaction fee!</strong>
        <Button
          sx={{ mt: 1, textTransform: "none" }}
          onClick={openCashBackDocumentation}
        >
          Learn more about the cashback fees
        </Button>
      </Alert>
    </Grid>
  );
};
