import { useRouter } from "next/router";
import { ReactNode } from "react";

import Grid from "@mui/material/Grid";
import Link from "next/link";
import Button from "@mui/material/Button";

interface Props {
  label: string;
  icon: ReactNode;
  url: string;
  newTab?: boolean;
}

const MenuLink = ({ label, icon, url, newTab }: Props) => {
  const { pathname } = useRouter();

  return (
    <Grid container item>
      <Link href={url}>
        <Button
          color={url === pathname ? "primary" : "inherit"}
          fullWidth
          startIcon={icon}
          sx={{
            justifyContent: "flex-start",
            textTransform: "none",
            p: 2,
            borderRadius: 2,
          }}
          href=""
          target={newTab ? "_blank" : undefined}
        >
          {label}
        </Button>
      </Link>
    </Grid>
  );
};

export default MenuLink;
