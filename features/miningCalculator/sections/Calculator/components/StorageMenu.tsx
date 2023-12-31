import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

interface Props {
  anchorEl: null | HTMLElement;
  isOpen: boolean;
  onCloseMenu: () => void;
  chooseStorageType: any;
}

export const StorageMenu = ({
  anchorEl,
  isOpen,
  onCloseMenu,
  chooseStorageType,
}: Props) => (
  <Menu
    anchorEl={anchorEl}
    open={isOpen}
    onClose={onCloseMenu}
    anchorOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
  >
    <MenuItem disabled>
      <Typography>Choose a storage capacity</Typography>
    </MenuItem>

    <Typography variant="body2" color="textSecondary" sx={{ ml: 2 }}>
      Decimal measurements
    </Typography>

    <MenuItem
      onClick={() => {
        chooseStorageType("TB");
      }}
    >
      <Avatar sx={{ mr: 1, bgcolor: "primary.main" }}>TB</Avatar>
      Terabyte
    </MenuItem>

    <Typography variant="body2" color="textSecondary" sx={{ mt: 2, ml: 2 }}>
      Binary measurements
    </Typography>

    <MenuItem
      onClick={() => {
        chooseStorageType("TiB");
      }}
    >
      <Avatar sx={{ mr: 1, bgcolor: "secondary.main" }}>TiB</Avatar>
      Terabyte (TiB)
    </MenuItem>
  </Menu>
);
