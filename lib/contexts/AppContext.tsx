import { FC, createContext } from "react";
import { isMobile } from "react-device-detect";
import { DeeplinkableWallet, GenericExtensionWallet } from "@signumjs/wallets";
import isClientSide from "@/lib/utils/isClientSide";

const isTestNet = process.env.NEXT_PUBLIC_PLATFORM_NETWORK === "Signum-TESTNET";

export interface AppContextType {
  IsClientSide: boolean;
  IsMobile: boolean;
  isTestNet: boolean;
  CanonicalUrl: string;
  Fetcher: any;
  DAppName: string;
  Wallet: {
    Extension: GenericExtensionWallet;
    Deeplink: DeeplinkableWallet;
  };
  Ledger: {
    Network: string;
    Explorer: string;
  };
}

const fetcher = async <JSON = any,>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON | null> => {
  try {
    const res = await fetch(input, init);
    if (res.status >= 200 && res.status < 300) {
      return res.json();
    }
  } catch (e) {}
  return null;
};

export const config: AppContextType = {
  IsMobile: isMobile,
  IsClientSide: isClientSide(),
  isTestNet,
  CanonicalUrl:
    process.env.NEXT_PUBLIC_PLATFORM_CANONICAL_URL || "https://fomplo.com",
  Fetcher: fetcher,
  DAppName: "Fomplo",
  Wallet: {
    Extension: new GenericExtensionWallet(),
    Deeplink: new DeeplinkableWallet({ openInBrowser: true }),
  },
  Ledger: {
    Network: process.env.NEXT_PUBLIC_PLATFORM_NETWORK || "Signum",
    Explorer:
      process.env.NEXT_PUBLIC_PLATFORM_NETWORK_EXPLORER ||
      "https://explorer.signum.network",
  },
};

export const AppContext = createContext<AppContextType>(config);

export const AppContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <AppContext.Provider value={config}>{children}</AppContext.Provider>;
};
