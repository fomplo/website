import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Layout from "@/lib/components/Layout";

export default function Custom404() {
  return (
    <Layout>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        maxWidth={500}
        mt={10}
        mx="auto"
        p={2}
      >
        <Box sx={{ width: { xs: "100%", lg: "100%" } }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="No found image"
            src="/assets/error.svg"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Box>

        <Typography align="center" variant="h4">
          Oops, page not found!
        </Typography>

        <Typography color="textSecondary" align="center" variant="h5">
          This page could not be found
        </Typography>
      </Box>
    </Layout>
  );
}
