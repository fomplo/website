import { RootState } from "@/states/store";
import { Monitor } from "./slice";

export const selectMonitoredTransactions = (state: RootState): Monitor[] => {
  return state.transactionState.monitoredTransactions;
};
