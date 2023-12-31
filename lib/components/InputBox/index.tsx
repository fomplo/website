/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface Props {
  // Name used for reconnizing the box
  name?: string;

  // This will show the string in the left side of the box
  valueLabel: string;

  // This will detect values changed on that input
  onInputChange?: (e: any) => void;

  // This will show the string in the right side of the box
  optionLabel: string;

  // This will assign a function to the right side selector
  onOptionClick?: () => void;
}

export const InputBox = ({
  name,
  valueLabel,
  onInputChange,
  optionLabel,
  onOptionClick,
}: Props) => {
  const largerSize = !!(optionLabel.length && optionLabel.length > 5);

  return (
    <Paper
      variant="outlined"
      css={css`
        -webkit-transition: all 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
        -moz-transition: all 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);
        transition: all 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);

        @media only screen and (min-width: 1200px) {
          :hover {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09) !important;
          }
        }
      `}
    >
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <input
          name={name}
          disabled={!onInputChange ? true : false}
          value={valueLabel}
          onChange={onInputChange}
          autoComplete="off"
          type="text"
          inputMode="decimal"
          style={{
            width: largerSize ? "55%" : "70%",
            height: "100%",
            padding: "20px 10px",
            paddingLeft: "15px",
            fontSize: "24px",
            margin: 0,
            border: 0,
            outline: 0,
            fontWeight: 700,
            borderRadius: "6px 0px 0px 6px",
            color: "rgba(0, 0, 0, 0.6)",
          }}
        />

        <ButtonBase
          disabled={onOptionClick ? false : true}
          onClick={onOptionClick ? onOptionClick : undefined}
          sx={{
            borderLeft: 1,
            borderColor: "divider",
            width: largerSize ? "45%" : "30%",
          }}
          css={css`
            align-self: stretch;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            border-radius: 0px 6px 6px 0px;
          `}
        >
          <Typography variant="h5" fontWeight={500} sx={{ opacity: 0.6 }}>
            {optionLabel}
          </Typography>

          {onOptionClick && <KeyboardArrowDownIcon sx={{ opacity: 0.6 }} />}
        </ButtonBase>
      </Box>
    </Paper>
  );
};
