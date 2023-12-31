import { ReactElement } from "react";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface Props {
  icon: ReactElement;
  label: string;
  description: string;
}

export const CtaCard = ({ icon, label, description }: Props) => (
  <Card
    variant="outlined"
    sx={{
      p: 2,
      transition: "0.3s all ease",
      "&:hover": {
        backgroundColor: "primary.main",
        color: "white",
        boxShadow: 20,
      },
    }}
  >
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={1}
      mb={0.5}
    >
      {icon}

      <Typography variant="body2" fontWeight={500}>
        {label}
      </Typography>
    </Stack>

    <Typography color="inherit" variant="body2">
      {description}
    </Typography>
  </Card>
);
