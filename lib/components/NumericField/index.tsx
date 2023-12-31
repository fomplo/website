import { NumericFormat } from "react-number-format";
import TextField from "@mui/material/TextField";

export const NumericField = ({ field, ...rest }: any) => (
  <NumericFormat
    {...field}
    customInput={TextField}
    valueIsNumericString
    allowNegative={false}
    // @ts-ignore
    ref={undefined}
    inputRef={field.ref}
    allowLeadingZeros
    onChange={undefined}
    onValueChange={(values) => field.onChange(values.floatValue)}
    thousandSeparator=","
    decimalSeparator="."
    decimalScale={8}
    fullWidth
    autoComplete="off"
    variant="outlined"
    color="secondary"
    {...rest}
  />
);
