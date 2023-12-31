import { formatAmount } from "@/lib/utils/functions";

export const mapValidationError = (message: any, getValue?: boolean): any => {
  if (typeof message === "object" && getValue)
    return { value: formatAmount(message?.value) };

  if (typeof message === "object") return message.key;

  switch (message) {
    case "required":
      return "Complete this field";

    case "fieldMustBeAnInteger":
      return "Decimals are not allowed, you must enter whole numbers";

    case "oneDecimalAllowed":
      return "Only 1 decimal is allowed";

    case "positive":
      return "This field must have a positive value";

    default:
      return "Invalid Field";
  }
};
