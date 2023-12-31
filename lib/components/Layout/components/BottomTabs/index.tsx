import { useRouter } from "next/router";
import { useState } from "react";
import { useAppDispatch } from "@/states/hooks";
import { actions } from "@/lib/states/appState";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShareIcon from "@mui/icons-material/Share";
import MenuTab from "./components/MenuTab";
import AppsDialog from "./components/AppsDialog";
import ShareDialog from "./components/ShareDialog";

const BottomTabs = () => {
  const { setIsOpenShareModal } = actions;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { pathname } = router;

  const [sidebarStatus, setSidebarStatus] = useState(false);
  const openSidebar = () => setSidebarStatus(true);
  const closeSidebar = () => setSidebarStatus(false);

  const homeTab = () => router.push("/");

  const openShareDialog = () => dispatch(setIsOpenShareModal(true));

  return (
    <Grid
      item
      width="100%"
      sx={{
        position: "fixed",
        bottom: 0,
        display: { xs: "flex", lg: "none" },
      }}
    >
      <AppsDialog isOpen={sidebarStatus} onClose={closeSidebar} />

      <ShareDialog />

      <Box
        width="100%"
        sx={{
          bgcolor: "background.paper",
          borderTop: 1,
          borderColor: "divider",
          boxShadow: "0 -1px 5px rgba(0,0,0,.1)",
        }}
      >
        <Grid container justifyContent="space-between" mx="auto" maxWidth={800}>
          <MenuTab
            label="Home"
            icon={<HomeIcon />}
            onClick={homeTab}
            active={pathname === "/"}
          />

          <MenuTab
            label="Apps"
            icon={<DashboardIcon />}
            onClick={openSidebar}
            active={pathname !== "/"}
          />

          <MenuTab
            label="Share"
            icon={<ShareIcon />}
            onClick={openShareDialog}
          />
        </Grid>
      </Box>
    </Grid>
  );
};

export default BottomTabs;
