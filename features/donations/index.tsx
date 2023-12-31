import type { NextPage } from "next";
import { useSnackbar } from "@/lib/hooks/useSnackbar";
import { useAppContext } from "@/lib/hooks/useAppContext";

import copy from "copy-to-clipboard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export const DonationsPage: NextPage = () => {
  const { IsMobile } = useAppContext();
  const { showSuccess } = useSnackbar();
  const donationAddress = "S-B6N3-FDVG-JQWY-D4N5U";

  const openPhoenixWallet = () => {
    window.location.href =
      "signum://requestBurst?receiver=" +
      donationAddress +
      "&amountNQT=5000000000";
  };

  const copyAddress = () => {
    copy(donationAddress);
    showSuccess("Copied address successfully!");
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Box
        width="100%"
        maxWidth={800}
        mx="auto"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          marginTop: { xs: 0, md: 10, lg: 20 },
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          align="center"
          fontWeight={700}
          sx={{ width: "100%" }}
          gutterBottom
        >
          Donations Accepted 😀
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          mx="auto"
          spacing={2}
        >
          <Avatar
            alt="IPR0310 Logo"
            src="/assets/home/ipr0310.webp"
            sx={{ width: 100, height: 100 }}
            variant="rounded"
          />

          <Avatar
            alt="Fomplo"
            src="/assets/poolMining.webp"
            sx={{ width: 100, height: 100 }}
            variant="rounded"
          />
        </Stack>

        <Typography
          variant="h6"
          align="center"
          fontWeight={700}
          sx={{ width: "100%", my: 2 }}
          gutterBottom
        >
          {donationAddress}
        </Typography>

        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          maxWidth={500}
          mx="auto"
          rowSpacing={2}
        >
          <Grid item xs={12} lg={5.5}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ textTransform: "none" }}
              startIcon={<ContentCopyIcon />}
              onClick={copyAddress}
            >
              Copy address
            </Button>
          </Grid>

          {!IsMobile && (
            <Grid item xs={12} lg={5.5}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ color: "white", textTransform: "none" }}
                startIcon={<SendIcon />}
                onClick={openPhoenixWallet}
              >
                Open Phoenix Wallet
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </Grid>
  );
};
