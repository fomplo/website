import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SnackBarState = {
  show?: boolean;
  label: string;
  severity: "" | "error" | "warning" | "info" | "success";
};

export interface AppState {
  isOpenShareModal: boolean;
  snackBar: SnackBarState;
  isOpenWalletSetupModal: boolean;
  isOpenWalletWrongNetworkModal: boolean;
  isOpenSignTransactionModal: boolean;
}

const initialState: AppState = {
  isOpenShareModal: false,
  snackBar: { show: false, label: "", severity: "" },
  isOpenWalletSetupModal: false,
  isOpenWalletWrongNetworkModal: false,
  isOpenSignTransactionModal: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsOpenShareModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenShareModal = action.payload;
    },
    setSnackbar: (state, action: PayloadAction<SnackBarState>) => {
      state.snackBar = action.payload;
    },
    setWalletSetupModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenWalletSetupModal = action.payload;
    },
    setWalletWrongNetworkModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenWalletWrongNetworkModal = action.payload;
    },
    setSignTransactionModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenSignTransactionModal = action.payload;
    },
  },
});

export const { actions } = appSlice;
