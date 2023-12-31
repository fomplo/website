import { Address } from "@signumjs/core";
import { useAppSelector } from "@/states/hooks";
import {
  selectWalletPublicKey,
  selectWatchOnly,
  selectAccount,
} from "@/lib/states/walletState";

export const useAccount = () => {
  const {
    id,
    name,
    description,
    totalBalance,
    availableBalance,
    committedBalance,
  } = useAppSelector(selectAccount);
  const watchOnly = useAppSelector(selectWatchOnly);
  const publicKey = useAppSelector(selectWalletPublicKey);

  let address: Address | null = null;

  try {
    address = publicKey ? Address.fromPublicKey(publicKey) : null;
  } catch (e) {
    address = null;
  }

  return {
    watchOnly,
    accountId: address ? id : undefined,
    publicKey: address ? publicKey : undefined,
    name,
    description,
    totalBalance,
    availableBalance,
    committedBalance,
  };
};
