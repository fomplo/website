import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import NavigationMenu from "@/lib/components/Layout/components/NavigationMenu";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AppsDialog = ({ isOpen, onClose }: Props) => {
  return (
    <Dialog
      onClose={onClose}
      open={isOpen}
      fullWidth
      sx={{ maxWidth: 500, mx: "auto" }}
    >
      <DialogContent>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={onClose}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>

        <NavigationMenu />
      </DialogContent>
    </Dialog>
  );
};

export default AppsDialog;
