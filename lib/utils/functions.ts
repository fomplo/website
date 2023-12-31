import isClientSide from "./isClientSide";

export const openExternalUrl = (url: string): void => {
  if (!isClientSide()) {
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
};

export const getAsString = (value: string | string[]): string => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

// Did this snippet because of the following reason: (Read usability issues)
// mui.com/components/text-fields/#type-quot-number-quot
export const formatInputNumber = (value: string) => {
  value = value.replace("-", "");
  value = value.replace("..", ".");

  return value.replace(/[^0-9-.]+/g, "");
};

export const formatAmount = (input?: string | number) => {
  if (input === 0 || input === "0" || input === undefined) return "0";
  if (typeof input === "string") input = parseFloat(input);

  return input.toLocaleString("en-US");
};

export const addCommaToNumber = (input: string | number) =>
  input.toString().replace(/^[+-]?\d+/, (int: string) => {
    return int.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  });
