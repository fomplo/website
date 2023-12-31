import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { selectisOpenShareModal, actions } from "@/lib/states/appState";

import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PublicIcon from "@mui/icons-material/Public";
import isClientSide from "@/lib/utils/isClientSide";
import copy from "copy-to-clipboard";

const ShareDialog = () => {
  const { setIsOpenShareModal } = actions;
  const dispatch = useAppDispatch();
  const isOpenShareModal = useAppSelector(selectisOpenShareModal);
  const onClose = () => dispatch(setIsOpenShareModal(false));

  let platforms: any = [];

  const handleListItemClick = (url: string, copyUrl: boolean = false) => {
    if (copyUrl) {
      copy(url);
      alert("Link copied successfully!");
      onClose();
      return;
    }

    window.open(url);
  };

  if (isClientSide()) {
    const url = window.location.href;

    platforms = [
      {
        label: "Twitter",
        icon: <TwitterIcon />,
        url: `https://twitter.com/intent/tweet?text=Check%20out%20this%20amazing%20site!%20%F0%9F%94%A5%0A${url}%0A%23Fomplo%20%23Signum%20%23SIGNA`,
      },
      {
        label: "Facebook",
        icon: <FacebookIcon />,
        url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      },
      {
        label: "Telegram",
        icon: <TelegramIcon />,
        url: `https://t.me/share/url?url=${url}&text=Check out this amazing site! 🔥`,
      },
      {
        label: "WhatsApp",
        icon: <WhatsAppIcon />,
        url: `https://api.whatsapp.com/send/?text=Check out this amazing site!, ${url}`,
      },
      {
        label: "Copy Link",
        icon: <PublicIcon />,
        url,
        copyUrl: true,
      },
    ];
  }

  return (
    <Dialog
      onClose={onClose}
      open={isOpenShareModal}
      fullWidth
      sx={{ maxWidth: 500, mx: "auto" }}
    >
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

      <DialogTitle sx={{ textAlign: "center" }}>
        Share it with your community!
      </DialogTitle>

      <DialogContent>
        <List>
          {platforms.map((item: any) => (
            <ListItem
              button
              onClick={() => handleListItemClick(item.url, item.copyUrl)}
              key={item.label}
              sx={{ borderRadius: 2 }}
            >
              <ListItemAvatar>
                <Avatar sx={{ color: "#ffffff", bgcolor: "primary.main" }}>
                  {item.icon}
                </Avatar>
              </ListItemAvatar>

              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
