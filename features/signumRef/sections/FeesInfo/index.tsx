import { DefaultContainer } from "@/lib/components/Cards/DefaultContainer";
import { FeeCard } from "./components/FeeCard";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface Props {
  data: any;
  loading: boolean;
}

export const FeesInfo = ({ data, loading }: Props) => {
  const signaPrice = !loading ? data.price : "";

  return (
    <Grid
      container
      item
      direction="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      mb={2}
    >
      <Typography
        variant="h6"
        textAlign="left"
        color="textSecondary"
        fontWeight={500}
        gutterBottom
      >
        Transaction Fees Estimations
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
          <Grid item xs={12} sm={4}>
            <FeeCard
              loading={loading}
              signaFee={!loading ? data.fees.minimal : ""}
              price={signaPrice}
              labelFee="Minimal"
              background="#3E5151"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FeeCard
              loading={loading}
              signaFee={!loading ? data.fees.standard : ""}
              price={signaPrice}
              labelFee="Standard"
              background="#016465"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FeeCard
              loading={loading}
              signaFee={!loading ? data.fees.priority : ""}
              price={signaPrice}
              labelFee="Priority"
              background="#3f2b96"
            />
          </Grid>
        </Grid>
      </DefaultContainer>

      <Typography
        color="textSecondary"
        align="center"
        sx={{ maxWidth: 485, mt: 1, fontSize: 13, mb: 4, mx: "auto" }}
      >
        These results are not guaranteed to be accurate as they depend on the
        average Blockchain usage, which varies over time, so fees estimations
        could fluctuate.
        <br />
        Higher transaction fees may speed up a transaction's confirmation.
      </Typography>
    </Grid>
  );
};
