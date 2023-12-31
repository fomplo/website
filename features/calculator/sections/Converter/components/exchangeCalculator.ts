import { currency } from "@/bff/types/converterResponse";

const exchangeCalculator = (
  exchangeData: currency[],
  from: string,
  to: string,
  value: string | number,
  side: "left" | "right"
): string => {
  let finalResult: string | number = "0";
  let tempCalculation = 0;

  let fromCurrencyData: currency = {
    name: "",
    symbol: "",
    isCrypto: false,
    price: "",
  };

  let toCurrencyData: currency = {
    name: "",
    symbol: "",
    isCrypto: false,
    price: "",
  };

  if (!exchangeData || !from || !to || !value) return finalResult;

  // Calculate variables
  // @ts-ignore
  let inputValue = parseFloat(value);

  exchangeData.forEach((currency) => {
    if (currency.symbol === from) fromCurrencyData = { ...currency };
    if (currency.symbol === to) toCurrencyData = { ...currency };
  });

  // Check if selected currency to convert is FIAT and Check if FIAT is the USD
  // Also check if selected input is on the left side
  if (
    !toCurrencyData.isCrypto &&
    toCurrencyData.symbol == "USD" &&
    side == "left"
  ) {
    // Calculate by Multiplying the crypto price by amount rate
    finalResult = inputValue * parseFloat(fromCurrencyData.price);
  }

  // -------------------------------------------------------------------------------------------------

  // Check if selected currency to convert is FIAT
  // Also check if selected input is on the left side
  if (
    !toCurrencyData.isCrypto &&
    toCurrencyData.symbol !== "USD" &&
    side == "left"
  ) {
    // 1 step: Convert crypto amount to USD
    tempCalculation = inputValue * parseFloat(fromCurrencyData.price);

    // 2 step: Convert the USD result to the selected FIAT
    finalResult = tempCalculation * parseFloat(toCurrencyData.price);
  }

  // -------------------------------------------------------------------------------------------------

  // Check if selected input is the right side
  // Check if the right side of the input is a fiat and Check if FIAT is the USD
  if (
    side == "right" &&
    !toCurrencyData.isCrypto &&
    toCurrencyData.symbol == "USD"
  ) {
    // Calculate by multiplying/Converting USD Amount to selected crypto
    finalResult = inputValue / parseFloat(fromCurrencyData.price);
  }

  // -------------------------------------------------------------------------------------------------

  // Check if selected input is the right side
  // Check if the right side of the input is a fiat
  if (
    side == "right" &&
    !toCurrencyData.isCrypto &&
    toCurrencyData.symbol !== "USD"
  ) {
    // 1 step: Convert FIAT amount to USD
    tempCalculation = inputValue / parseFloat(toCurrencyData.price);

    // 2 step: Convert the USD result to the selected Crypto
    finalResult = tempCalculation / parseFloat(fromCurrencyData.price);
  }

  // -------------------------------------------------------------------------------------------------

  // Check if selected input is the left side
  // Also check if currency selected to convert is a cryptocurrency
  if (side == "left" && toCurrencyData.isCrypto) {
    // 1 step: Convert crypto amount to USD
    tempCalculation = inputValue * parseFloat(fromCurrencyData.price);

    // 2 step: Convert the multiplied USD amount to the selected crypto
    finalResult = tempCalculation / parseFloat(toCurrencyData.price);
  }

  // -------------------------------------------------------------------------------------------------

  // Check if selected input is the right side
  // Also check if currency selected to convert is a cryptocurrency
  if (side == "right" && toCurrencyData.isCrypto) {
    // 1 step: Convert the crypto amount to USD
    tempCalculation = inputValue * parseFloat(toCurrencyData.price);

    // 2 step: Convert the multiplied USD amount to the selected crypto
    finalResult = tempCalculation / parseFloat(fromCurrencyData.price);
  }

  // Check if both currencies are the same
  if (fromCurrencyData.symbol == toCurrencyData.symbol) {
    finalResult = inputValue;
  }

  // Round up to six decimals
  const calculated = finalResult.toString().split(".");

  if (
    calculated &&
    calculated.length == 2 &&
    calculated[1] &&
    calculated[1].trim() !== "" &&
    calculated[1].trim().length > 6 &&
    !finalResult.toString().includes("e-")
  ) {
    finalResult = calculated[0] + "." + calculated[1].slice(0, 6);
  } else if (finalResult.toString().includes("e-")) {
    finalResult = toPlainString(finalResult.toString());
  }

  return finalResult.toString();
};

const toPlainString = (num: string) => {
  return ("" + +num).replace(
    /(-?)(\d*)\.?(\d*)e([+-]\d+)/,
    function (a, b, c, d, e) {
      return e < 0
        ? b + "0." + Array(1 - e - c.length).join("0") + c + d
        : b + c + d + Array(e - d.length + 1).join("0");
    }
  );
};

export default exchangeCalculator;
