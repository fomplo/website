import { useAppContext } from "@/lib/hooks/useAppContext";
import { WalletInitializer } from "./WalletInitializer";
import { AccountInitializer } from "./AccountInitializer";
import { MonitorTransactionsInitializer } from "./MonitoredTransactionsInitializer";

export const AppInitializer = () => {
  const { IsClientSide } = useAppContext();

  if (!IsClientSide) return null;

  return (
    <>
      <WalletInitializer />
      <AccountInitializer />
      <MonitorTransactionsInitializer />
    </>
  );
};
