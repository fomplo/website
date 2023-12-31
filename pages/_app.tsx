import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, storePersistor } from "@/states/store";
import { AppContextProvider } from "@/lib/contexts/AppContext";
import { ThemeContextProvider } from "@/lib/contexts/ThemeContext";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@/styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AppContextProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={storePersistor}>
          <ThemeContextProvider>
            <Component {...pageProps} />
          </ThemeContextProvider>
        </PersistGate>
      </ReduxProvider>
    </AppContextProvider>
  );
};

export default MyApp;
