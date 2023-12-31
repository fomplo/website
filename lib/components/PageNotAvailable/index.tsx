import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const PageNotAvailable = () => {
  return (
    <Grid
      item
      container
      direction="row"
      alignItems="flex-start"
      justifyContent="space-between"
      maxWidth={500}
      mx="auto"
      mt={10}
      sx={{ display: { xs: "flex", lg: "none" } }}
    >
      <Typography variant="h4" align="center">
        This module is not available for mobile/tablet devices
      </Typography>
    </Grid>
  );
};
