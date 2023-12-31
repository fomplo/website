import { useState, useEffect } from "react";
import { InputBox } from "@/lib/components/InputBox";
import { DefaultContainer } from "@/lib/components/Cards/DefaultContainer";
import { formatInputNumber, addCommaToNumber } from "@/lib/utils/functions";
import { TBMeasurements } from "@/lib/utils/storageTypes";
import { StorageMenu } from "./components/StorageMenu";
import { MiningResults } from "./components/MiningResults";
import { ProfitResults } from "./components/ProfitResults";
import { Roi } from "./components/Roi";

import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

interface Props {
  data: any;
}

export const Calculator = ({ data }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const [sizeInput, setSizeInput] = useState({
    value: "0",
    inputValue: "0",
    storage: "TiB",
    calculatedStorage: 0,
  });

  const [commitmentInput, setCommitmentInput] = useState({
    value: "2000",
    inputValue: "2000",
  });

  const [pocResults, setPocResults] = useState({
    pocBoost: 0,
    effectiveCapacity: 0,
  });

  const [profit, setProfit] = useState({
    signa: 0,
    usd: 0,
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const chooseStorageType = (type: TBMeasurements) => {
    setSizeInput({
      ...sizeInput,
      storage: type,
    });

    closeMenu();
  };

  // Initial loading for the first visit
  useEffect(() => {
    if (data) setIsLoading(false);
  }, [data]);

  // Now, everytime a user has typed on the first input (Plot size) or change the storage tier, it will fire the storage conversion logic
  useEffect(() => {
    if (!isLoading) plotSizeCalculator();
  }, [sizeInput.inputValue, sizeInput.storage]);

  // Now, everytime a user has updated the form inputs (all of them), it will fire the poc+ calculator
  useEffect(() => {
    if (!isLoading) pocCalculator();
  }, [sizeInput.value, sizeInput.calculatedStorage, commitmentInput.value]);

  const onChangeInput = (e: any) => {
    let { name, value } = e.currentTarget;
    if (name !== "storage" && name !== "commitment") return;

    let finalValue = formatInputNumber(value) || "0";

    if (finalValue && finalValue !== "0" && !finalValue.includes("."))
      finalValue = parseFloat(finalValue).toString();

    switch (name) {
      case "storage":
        setSizeInput({ ...sizeInput, inputValue: finalValue });
        break;

      case "commitment":
        setCommitmentInput({
          ...commitmentInput,
          inputValue: finalValue,
          value: finalValue,
        });
        break;
    }
  };

  const plotSizeCalculator = () => {
    let { inputValue, storage } = sizeInput;
    let finalResult: string | number = 0;

    if (!inputValue || inputValue == "0") finalResult = 0;

    // Check if storage tier selected is TB or TiB
    // Convert always TB to TiB
    switch (storage) {
      case "TB":
        finalResult =
          inputValue.toString() != "0"
            ? parseFloat(inputValue) / 1.0995116278
            : 0;
        break;

      case "TiB":
        finalResult =
          inputValue.toString() != "0" ? parseFloat(inputValue) : inputValue;
        break;

      default:
        break;
    }

    setSizeInput({
      ...sizeInput,
      value: inputValue,
      calculatedStorage: Number(finalResult),
    });
  };

  const pocCalculator = () => {
    const physicalPlotSize = sizeInput.calculatedStorage || 0;
    const userCommitment = parseFloat(commitmentInput.value) || 0;

    const { baseTarget, blockReward, averageCommitment, price } = data;

    // Calculate difficulty
    const generalCommitment = Number((averageCommitment / 1e8).toFixed(0));

    // Calculate results
    const e = userCommitment / physicalPlotSize / generalCommitment;
    let t = Math.pow(e, 0.3110788818);
    t = Math.min(8, t);
    t = Math.max(0.125, t);

    // Get PoC+ Boost
    const pocBoost = t ? Number(t.toFixed(3)) : 0;

    // Get Effective Capacity
    const effectiveCapacity = Number((t * physicalPlotSize).toFixed(3)) || 0;

    setPocResults({
      pocBoost,
      effectiveCapacity,
    });

    // Save daily signa profits
    const estimates = (360 / (18325193796 / baseTarget / 1.83)) * blockReward;
    const dailyReward = Number((estimates * t * physicalPlotSize).toFixed(2));

    // Convert daily Signa profit to USD
    const usdDailyReward = Number((dailyReward * price).toFixed(2));

    setProfit({
      signa: dailyReward,
      usd: usdDailyReward,
    });
  };

  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Typography
        component="h1"
        variant="h5"
        fontWeight={700}
        sx={{ width: "100%", textAlign: { xs: "center", lg: "left" } }}
        gutterBottom
      >
        Signum Mining Calculator
      </Typography>

      <DefaultContainer>
        {isLoading && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={164}
            sx={{ borderRadius: 1 }}
          />
        )}

        {!isLoading && (
          <Grid
            container
            item
            direction="column"
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
              Type your plot size
            </Typography>

            <InputBox
              name="storage"
              valueLabel={
                sizeInput.value ? addCommaToNumber(sizeInput.value) : "0"
              }
              optionLabel={sizeInput.storage}
              onInputChange={onChangeInput}
              // @ts-ignore
              onOptionClick={openMenu}
            />

            <StorageMenu
              anchorEl={anchorEl}
              isOpen={isMenuOpen}
              onCloseMenu={closeMenu}
              chooseStorageType={chooseStorageType}
            />

            <Typography
              variant="h6"
              color="textSecondary"
              align="center"
              sx={{ mt: 2 }}
              gutterBottom
            >
              How much Signa will you commit?
            </Typography>

            <InputBox
              name="commitment"
              valueLabel={
                commitmentInput.value
                  ? addCommaToNumber(commitmentInput.value)
                  : "0"
              }
              optionLabel="SIGNA"
              onInputChange={onChangeInput}
            />

            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 1, opacity: 0.7 }}
            >
              This is also known as Signum commitment
            </Typography>
          </Grid>
        )}

        {!isLoading && (
          <MiningResults
            commitment={Number(commitmentInput.inputValue)}
            calculatedStorage={sizeInput.calculatedStorage}
            pocBoost={pocResults.pocBoost}
            effectiveCapacity={pocResults.effectiveCapacity}
          />
        )}
      </DefaultContainer>

      {!isLoading && <ProfitResults signa={profit.signa} usd={profit.usd} />}

      <Typography
        color="textSecondary"
        align="center"
        sx={{ maxWidth: 485, mt: 1, fontSize: 13, mb: 4 }}
      >
        This calculator serves only as a long term revenue estimate. These
        results are not guaranteed to be accurate as they depend on the average
        miner commitment, which varies over time, so your real income could
        fluctuate.
      </Typography>

      {!isLoading && <Roi signa={profit.signa} usd={profit.usd} />}
    </Grid>
  );
};
