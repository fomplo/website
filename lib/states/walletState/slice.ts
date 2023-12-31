import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AccountData {
  id: string;
  accountRS: string;
  name: string;
  description: string;
  totalBalance: number;
  availableBalance: number;
  committedBalance: number;
}

export interface WalletState {
  isWalletConnected: boolean;
  watchOnly: boolean;
  walletNodeHost: string;
  walletPublicKey: string;
  account: AccountData;
}

const initialState: WalletState = {
  isWalletConnected: false,
  watchOnly: false,
  walletNodeHost: "",
  walletPublicKey: "",
  account: {
    id: "",
    accountRS: "",
    name: "",
    description: "",
    totalBalance: 0,
    availableBalance: 0,
    committedBalance: 0,
  },
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setIsWalletConnected: (state, action: PayloadAction<boolean>) => {
      state.isWalletConnected = action.payload;
    },
    setWatchOnly: (state, action: PayloadAction<boolean>) => {
      state.watchOnly = action.payload;
    },
    setWalletNodeHost: (state, action: PayloadAction<string>) => {
      state.walletNodeHost = action.payload;
    },
    setWalletPublicKey: (state, action: PayloadAction<string>) => {
      state.walletPublicKey = action.payload;
    },
    setAccount: (state, action: PayloadAction<AccountData>) => {
      state.account = action.payload;
    },
  },
});

export const { actions } = walletSlice;
