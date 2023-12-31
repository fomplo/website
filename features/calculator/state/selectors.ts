import { RootState } from "@/states/store";

export const selectCrypto = (state: RootState): string =>
  state.calculatorState.crypto;

export const selectSvalue = (state: RootState): string =>
  state.calculatorState.sValue;
