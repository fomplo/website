/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactNode } from "react";

import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface Props {
  label: string;
  description: string;
  url: string;
  imgSrc: string;
  icon: ReactNode;
  newTab?: boolean;
}

const AppCard = ({ label, description, url, imgSrc, icon, newTab }: Props) => {
  return (
    <Grid
      container
      item
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      css={css`
        * {
          -webkit-transition: all 0.3s ease;
          -moz-transition: all 0.3s ease;
          transition: all 0.3s ease;
        }

        .picture {
          background-size: 100%;
          box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.05),
            0px 5px 10px rgba(0, 0, 0, 0.05);
        }

        @media only screen and (min-width: 1200px) {
          :hover .picture {
            background-size: 115%;
            box-shadow: 0px 25px 75px #54ad8d !important;
          }
        }
      `}
    >
      <Box width="100%" height={200}>
        <Link href={url}>
          <Box
            className="picture"
            width="100%"
            height="100%"
            borderRadius={2}
            sx={{
              display: "flex",
              background: `url(${imgSrc})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              cursor: "pointer",
            }}
          ></Box>
        </Link>
      </Box>

      <Box width="95%" mx="auto" mt={-2}>
        <Paper elevation={4} sx={{ p: 2 }}>
          <Typography align="center" fontWeight={500}>
            {label}
          </Typography>

          <Typography align="center" color="textSecondary" gutterBottom>
            {description}
          </Typography>

          <Link href={url}>
            <Button
              fullWidth
              startIcon={icon}
              sx={{
                border: 1,
                borderColor: "divider",
                textTransform: "none",
              }}
              href=""
              target={newTab ? "_blank" : undefined}
            >
              Open
            </Button>
          </Link>
        </Paper>
      </Box>
    </Grid>
  );
};

export default AppCard;
