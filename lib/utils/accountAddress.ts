import { Address, AddressPrefix } from "@signumjs/core";
import { config } from "@/lib/contexts/AppContext";

export const asAccountAddress = (accountId: string): Address => {
  const Prefix = config.isTestNet
    ? AddressPrefix.TestNet
    : AddressPrefix.MainNet;
  return Address.create(accountId, Prefix);
};

export const asRSAddress = (accountId: string): string | null => {
  try {
    return asAccountAddress(accountId).getReedSolomonAddress();
  } catch (error) {
    return null;
  }
};

export const asAccountId = (accountId: string): string | null => {
  try {
    return asAccountAddress(accountId).getNumericId();
  } catch (error) {
    return null;
  }
};
