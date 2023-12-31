/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, ReactNode } from "react";
import Paper from "@mui/material/Paper";

export const DefaultContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Paper
      variant="outlined"
      sx={{ width: "100%", py: 3, px: { xs: 1, md: 3 }, borderRadius: 2 }}
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
      {children}
    </Paper>
  );
};
