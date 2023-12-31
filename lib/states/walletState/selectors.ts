import { RootState } from "@/states/store";
import { AccountData } from "./slice";

export const selectIsWalletConnected = (state: RootState): boolean =>
  state.walletState.isWalletConnected;

export const selectWatchOnly = (state: RootState): boolean =>
  state.walletState.watchOnly;

export const selectWalletNodeHost = (state: RootState): string =>
  state.walletState.walletNodeHost;

export const selectWalletPublicKey = (state: RootState): string =>
  state.walletState.walletPublicKey;

export const selectAccount = (state: RootState): AccountData =>
  state.walletState.account;
