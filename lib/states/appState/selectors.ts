import { RootState } from "@/states/store";
import { SnackBarState } from "./slice";

export const selectisOpenShareModal = (state: RootState): boolean =>
  state.appState.isOpenShareModal;

export const selectAppSnackbar = (state: RootState): SnackBarState =>
  state.appState.snackBar;

export const selectIsOpenWalletSetupModal = (state: RootState): boolean =>
  state.appState.isOpenWalletSetupModal;

export const selectIsOpenWalletWrongNetworkModal = (
  state: RootState
): boolean => state.appState.isOpenWalletWrongNetworkModal;

export const selectIsOpenSignTransactionModal = (state: RootState): boolean =>
  state.appState.isOpenSignTransactionModal;
