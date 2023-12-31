import * as yup from "yup";

import {
  requiredNumberField,
  optionalStringField,
  requiredStringField,
} from "@/lib/validation/schemas/defaultSchemaMethods";

import "@/lib/validation/schemas/defaultSchema";

export const createSubscriptionSchema = yup
  .object({
    receiverAddress: optionalStringField.uppercase(),
    cost: requiredNumberField.min(1),
    billingAmount: requiredNumberField,
    billingFormat: requiredStringField,
  })
  .required();
