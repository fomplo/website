import { useState, useEffect } from "react";
import { DefaultContainer } from "@/lib/components/Cards/DefaultContainer";
import {
  formatAmount,
  addCommaToNumber,
  formatInputNumber,
} from "@/lib/utils/functions";
import { InputBox } from "@/lib/components/InputBox";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

interface Props {
  signa: number;
  usd: number;
}

export const Roi = ({ signa, usd }: Props) => {
  const [roiInput, setRoiInput] = useState("");
  const [roiDays, setRoiDays] = useState(0);

  useEffect(() => {
    if (signa && usd && roiInput) updateRoiData();
  }, [signa, usd, roiInput]);

  const updateRoiData = () => {
    let countedDays = 0;
    const userCosts = parseFloat(roiInput);

    do {
      countedDays = countedDays + 1;
    } while (usd * countedDays <= userCosts);

    setRoiDays(countedDays);
  };

  const onChangeInput = (e: any) => {
    let { name, value } = e.currentTarget;
    if (name !== "roi") return;

    let finalValue = formatInputNumber(value) || "";

    if (finalValue && finalValue !== "0" && !finalValue.includes("."))
      finalValue = parseFloat(finalValue).toString();

    setRoiInput(finalValue);
  };

  const canShowResults = !!(
    roiInput &&
    roiInput !== "0" &&
    signa &&
    usd &&
    usd > 0.005 &&
    roiDays
  );

  return (
    <DefaultContainer>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        maxWidth={400}
        mx="auto"
      >
        <Typography
          variant="h6"
          color="textSecondary"
          align="center"
          gutterBottom
        >
          What are your hardware costs? (Optional)
        </Typography>

        <InputBox
          name="roi"
          valueLabel={roiInput ? addCommaToNumber(roiInput) : "0"}
          optionLabel="USD"
          onInputChange={onChangeInput}
        />
      </Box>

      {canShowResults && (
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ pb: 2, borderBottom: 1, borderColor: "divider", mt: 2 }}
        >
          <Typography variant="h6">Return of investment</Typography>
          <Typography gutterBottom>
            It may take you{" "}
            <Typography component="span" fontWeight={700} color="primary">
              {formatAmount(roiDays)} days
            </Typography>{" "}
            to make profits, in that time you may have mined{" "}
            {formatAmount(signa * roiDays)} Signa.
          </Typography>

          <Typography color="textSecondary" style={{ fontSize: 13 }}>
            <b>Disclaimer:</b> This calculator serves only as a long term
            revenue estimate. These results are not guaranteed to be accurate as
            they depend on the average miner commitment, which varies over time,
            so your real income could fluctuate
          </Typography>
        </Box>
      )}

      <Alert severity="success" sx={{ width: "100%", mt: 2 }}>
        <AlertTitle>
          Signum, an <strong>eco-friendly</strong> blockchain
        </AlertTitle>
        The Signum mining system relies on the existing free space on your
        hard-drive, instead of energy-hungry CPUs and GPUs. The difference
        between mining and normal/idle computer operation is so negligible that
        you will barely notice a difference on your power bill.
      </Alert>
    </DefaultContainer>
  );
};
