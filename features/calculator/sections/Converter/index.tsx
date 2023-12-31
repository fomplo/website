import { useState, useEffect } from "react";
import { setCookies } from "cookies-next";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { DefaultContainer } from "@/lib/components/Cards/DefaultContainer";
import { SEOMetaTags } from "@/lib/components/SEOMetaTags";
import { InputBox } from "@/lib/components/InputBox";
import { currencies } from "@/lib/utils/currencies";
import { CalculatorProps } from "@/features/calculator/types";
import { formatInputNumber, addCommaToNumber } from "@/lib/utils/functions";
import {
  selectCrypto,
  selectSvalue,
  actions,
} from "@/features/calculator/state";
import exchangeCalculator from "./components/exchangeCalculator";
import CurrencySelectorDialog from "./components/CurrencySelectorDialog";

import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

interface Props extends CalculatorProps {
  data: any;
}

export const Converter = ({ cryptoKey, sValueKey, data }: Props) => {
  const { setCrypto, setSValue } = actions;
  const selectedCrypto = useAppSelector(selectCrypto);
  const selectedSValue = useAppSelector(selectSvalue);
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState(
    // @ts-ignore
    currencies[cryptoKey] + " Converter Calculator"
  );

  const [currencyDialogMode, setCurrencyDialogMode] = useState<
    "left" | "right"
  >("left");

  const [showCurrencyDialog, setShowCurrencyDialog] = useState(false);
  const openCurrencyDialog = () => setShowCurrencyDialog(true);
  const closeCurrencyDialog = () => setShowCurrencyDialog(false);

  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    fInput: {
      value: "1",
      inputValue: "1",
    },
    sInput: {
      value: "",
      inputValue: "",
    },
  });

  useEffect(() => {
    dispatch(setCrypto(cryptoKey));
    dispatch(setSValue(sValueKey));
  }, []);

  // Initial loading for the first visit
  useEffect(() => {
    if (data) {
      updateValueFromLeftInput();
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    updateValueFromLeftInput();
  }, [formData.fInput.inputValue]);

  useEffect(() => {
    updateValueFromRightInput();
  }, [formData.sInput.inputValue]);

  // Everytime a user update/change a currency,
  // 1- It will update the cookies
  // 2- It will update the title
  useEffect(() => {
    // Cookie's expiration date
    const expDate = new Date();
    expDate.setTime(expDate.getTime() + 60000 * 60 * 1000);

    setCookies("crypto", isLoading ? cryptoKey : selectedCrypto, {
      path: "/",
      expires: expDate,
    });

    setCookies("svalue", isLoading ? sValueKey : selectedSValue, {
      path: "/",
      expires: expDate,
    });

    if (isLoading) return;

    // @ts-ignore
    setTitle(currencies[selectedCrypto] + " Converter Calculator");

    // Update rates according to new currency option
    updateValueFromLeftInput();
  }, [selectedCrypto, selectedSValue]);

  const onChangeInput = (e: any) => {
    const { name, value } = e.currentTarget;
    if (name !== "fInput" && name !== "sInput") return;

    const finalValue = formatInputNumber(value) || "0";

    setFormData({
      ...formData,
      [name]: {
        // @ts-ignore
        ...formData[name],
        inputValue: finalValue,
      },
    });
  };

  const updateValueFromLeftInput = () => {
    let inputValue: string | number | undefined = formData.fInput.inputValue;

    let finalResult: string | number = "0";

    if (inputValue && inputValue !== "0" && !inputValue.includes("."))
      inputValue = parseFloat(inputValue);

    finalResult = exchangeCalculator(
      data?.currencies || [],
      selectedCrypto,
      selectedSValue,
      inputValue,
      "left"
    );

    setFormData({
      ...formData,
      fInput: {
        inputValue: formData.fInput.inputValue,
        value: inputValue.toString(),
      },
      sInput: {
        inputValue: formData.sInput.inputValue,
        value: finalResult,
      },
    });
  };

  const updateValueFromRightInput = () => {
    let inputValue: string | number | undefined = formData.sInput.inputValue;

    let finalResult: string | number = "0";

    if (inputValue && inputValue !== "0" && !inputValue.includes("."))
      inputValue = parseFloat(inputValue);

    finalResult = exchangeCalculator(
      data?.currencies || [],
      selectedCrypto,
      selectedSValue,
      inputValue,
      "right"
    );

    setFormData({
      ...formData,
      fInput: {
        inputValue: formData.fInput.inputValue,
        value: finalResult,
      },
      sInput: {
        inputValue: formData.sInput.inputValue,
        value: inputValue.toString(),
      },
    });
  };

  const openOptionsLeftInput = () => {
    setCurrencyDialogMode("left");
    openCurrencyDialog();
  };

  const openOptionsRightInput = () => {
    setCurrencyDialogMode("right");
    openCurrencyDialog();
  };

  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      sx={{ marginTop: { xs: 0, md: 10, lg: 20 } }}
    >
      {!isLoading && selectedSValue && selectedCrypto && (
        <SEOMetaTags
          title={`✔️ ${title} - Fomplo`}
          // @ts-ignore
          description={`Use the Fomplo ${title} 😀 Convert amounts to or from different currencies with this simple converter calculator. It is easier to convert or calculate ${currencies[selectedCrypto]}`}
          // @ts-ignore
          keywords={`${currencies[selectedCrypto]} калькулятор, калькулятор ${currencies[selectedCrypto]}, ${selectedCrypto} to ${selectedSValue}, ${currencies[selectedCrypto]} to ${selectedSValue} calculator, ${currencies[selectedCrypto]} to ${selectedSValue} converter, ${currencies[selectedCrypto]} converter, ${currencies[selectedCrypto]} calculator`}
          imgUrl={"/assets/home/crypto.webp"}
        />
      )}

      {data?.currencies && (
        <CurrencySelectorDialog
          data={data.currencies}
          isOpen={showCurrencyDialog}
          mode={currencyDialogMode}
          onClose={closeCurrencyDialog}
        />
      )}

      <Typography component="h1" variant="h4" align="center" sx={{ mb: 2 }}>
        {title}
      </Typography>

      <DefaultContainer>
        {isLoading && (
          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={0.5}
          >
            <Grid item xs={12} lg={5.5}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={68}
                sx={{ borderRadius: 1 }}
              />
            </Grid>

            <Grid item mx="auto" my={2}>
              <Skeleton variant="circular" width={20} height={20} />
            </Grid>

            <Grid item xs={12} lg={5.5}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={68}
                sx={{ borderRadius: 1 }}
              />
            </Grid>
          </Grid>
        )}

        {!isLoading && (
          <Grid
            container
            direction="column"
            alignItems="center"
            position="relative"
          >
            <Grid
              item
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={0.5}
            >
              <Grid item xs={12} lg={5.5}>
                <InputBox
                  name="fInput"
                  valueLabel={
                    formData.fInput.value
                      ? addCommaToNumber(formData.fInput.value)
                      : "0"
                  }
                  optionLabel={selectedCrypto}
                  onInputChange={onChangeInput}
                  onOptionClick={openOptionsLeftInput}
                />
              </Grid>

              <Grid item mx="auto">
                <Typography variant="h4" color="primary" className="equalSign">
                  =
                </Typography>
              </Grid>

              <Grid item xs={12} lg={5.5}>
                <InputBox
                  name="sInput"
                  valueLabel={
                    formData.sInput.value
                      ? addCommaToNumber(formData.sInput.value)
                      : "0"
                  }
                  optionLabel={selectedSValue}
                  onInputChange={onChangeInput}
                  onOptionClick={openOptionsRightInput}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </DefaultContainer>

      <Typography
        color="textSecondary"
        align="center"
        fontSize={13}
        sx={{ maxWidth: 650, mb: 2, mt: 1 }}
      >
        “The exchange rates on this site are for information purposes only. They
        are not guaranteed to be accurate, and are subject to change without
        notice. Some rates are calculated using {selectedCrypto}/USD price”
      </Typography>
    </Grid>
  );
};
