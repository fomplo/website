import { ReactNode } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

interface Props {
  label: string;
  icon: ReactNode;
  active?: boolean;
  onClick: () => void;
}

const MenuTab = ({ label, icon, active, onClick }: Props) => {
  return (
    <Grid item xs={3}>
      <ButtonBase
        onClick={onClick}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 1,
          color: active ? "primary.main" : "inherit",
        }}
      >
        {icon}

        <Typography align="center" fontWeight={500}>
          {label}
        </Typography>
      </ButtonBase>
    </Grid>
  );
};

export default MenuTab;
