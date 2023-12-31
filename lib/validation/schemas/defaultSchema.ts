import { setLocale } from "yup";

setLocale({
  string: {
    min: ({ min }) => ({
      key: `This field must be longer than ${min} characters long`,
    }),
    max: ({ max }) => ({
      key: `This field must have less than or equal to ${max} characters long`,
    }),
  },
  number: {
    min: ({ min }) => ({
      key: `This field must be more than or equal to ${min}`,
    }),
    max: ({ max }) => ({
      key: `This field must be less than or equal to ${max}`,
    }),
    integer: () => "fieldMustBeAnInteger",
  },
});
