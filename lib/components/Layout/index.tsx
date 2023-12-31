import { useRouter } from "next/router";
import { Fragment, FC, ReactNode, useEffect } from "react";
import { SEOMetaTags } from "@/lib/components/SEOMetaTags";
import { AppInitializer } from "../AppInitializer";
import { SetupWalletModal } from "./components/Modals/SetupWalletModal";
import { SignTransactionModal } from "./components/Modals/SignTransactionModal";
import { WalletWrongNetworkModal } from "./components/Modals/WalletWrongNetworkModal";

import Image from "next/image";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import NavigationMenu from "./components/NavigationMenu";
import BottomTabs from "./components/BottomTabs";
import AppSnackBar from "./components/AppSnackBar";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    NProgress.configure({ showSpinner: false, easing: "ease", speed: 400 });

    router.events.on("routeChangeStart", () => {
      NProgress.start();
    });

    router.events.on("routeChangeComplete", () => {
      NProgress.done();
    });

    router.events.on("routeChangeError", () => {
      NProgress.done();
    });
  }, []);

  return (
    <Fragment>
      <AppInitializer />
      <AppSnackBar />

      <SetupWalletModal />
      <SignTransactionModal />
      <WalletWrongNetworkModal />

      <SEOMetaTags
        title="Welcome to Fomplo"
        description="Meet one of the helpful platform for the community. We do not only have a Signum converter/calculator. We have different tools that you could love 😀"
        keywords="fomplo, Fomplo, fomplo cryptocurrency, fomplo Signa, fomplo Signum, fomplo Burstcoin, fomplo calculator, fomplo nonce calculator, fomplo mining calculator"
        imgUrl="/assets/poolMining.webp"
      />

      <Grid
        container
        direction="row"
        alignItems="flex-start"
        position="relative"
        maxWidth={1920}
        mx="auto"
        wrap="wrap"
      >
        <Grid
          item
          xs={12}
          lg={3}
          xl={2.1}
          height="100%"
          alignSelf="stretch"
          sx={{
            position: { xs: "relative", lg: "sticky" },
            top: 0,
            px: 2,
            borderRight: { xs: 0, lg: `1px solid rgba(0, 0, 0, 0.12)` },
          }}
        >
          <Box
            mx="auto"
            display="flex"
            justifyContent="center"
            width="100%"
            my={1}
          >
            <Link href="/">
              <Image
                src="/assets/longLogo.webp"
                alt="Fomplo"
                width={192}
                height={55}
                unoptimized
                style={{ cursor: "pointer" }}
              />
            </Link>
          </Box>

          <Box
            mx="auto"
            justifyContent="center"
            width="100%"
            mt={2}
            flexGrow={1}
            sx={{
              display: { xs: "none", lg: "flex" },
              height: { lg: "calc(100vh - 10vh)", xl: "calc(100vh - 79px)" },
            }}
          >
            <NavigationMenu />
          </Box>
        </Grid>

        <Grid item xs={12} lg={9} xl={9.9}>
          <Box width="100%" maxWidth={1200} mx="auto" px={2} pt={2} mb={12}>
            {children}
          </Box>
        </Grid>

        <BottomTabs />
      </Grid>
    </Fragment>
  );
};

export default Layout;
