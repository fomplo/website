import { config } from "@/lib/contexts/AppContext";
import { openExternalUrl } from "./functions";

const explorerUrl = config.Ledger.Explorer;

export const getExplorerUrl = (url: string): string => {
  if (url.startsWith("/")) {
    url = url.slice(1);
  }

  return explorerUrl + "/" + url;
};

// Pre-defined URLs
export const viewTransactionInExplorer = (accountId: string): void => {
  openExternalUrl(getExplorerUrl("/tx/" + accountId));
};

export const viewAccountInExplorer = (accountId: string): void => {
  openExternalUrl(getExplorerUrl("/address/" + accountId));
};

export const viewBlockInExplorer = (blockHeight: string): void => {
  openExternalUrl(getExplorerUrl("/block/" + blockHeight));
};
