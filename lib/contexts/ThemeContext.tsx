import { FC } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";

import Head from "next/head";
import theme from "@/styles/theme";
import CssBaseline from "@mui/material/CssBaseline";
import createEmotionCache from "@/styles/createEmotionCache";

interface Props {
  children: React.ReactNode;
}

export const ThemeContextProvider: FC<Props> = ({ children }) => {
  const clientSideEmotionCache = createEmotionCache();

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};
