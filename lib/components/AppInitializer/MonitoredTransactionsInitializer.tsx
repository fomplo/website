import useSWR from "swr";
import { useDispatch } from "react-redux";
import { useLedger } from "@/lib/hooks/useLedger";
import {
  selectMonitoredTransactions,
  transactionActions,
} from "@/lib/states/transactionState";
import { useAppSelector } from "@/states/hooks";
import { Transaction } from "@signumjs/core";

const Hour = 1000 * 60 * 60;

export const MonitorTransactionsInitializer = () => {
  const dispatch = useDispatch();
  const ledger = useLedger();
  const monitoredTransactions = useAppSelector(selectMonitoredTransactions);

  useSWR(
    `fetchMonitoredTransactions`,
    async () => {
      if (!ledger) return null;

      const transactionRequests: Promise<Transaction>[] = [];
      const now = Date.now();
      for (let m of monitoredTransactions) {
        if (now - m.timestamp > 4 * Hour) {
          dispatch(transactionActions.removeMonitor(m.transactionId));
        } else {
          transactionRequests.push(
            ledger.transaction.getTransaction(m.transactionId)
          );
        }
      }

      const transactions = await Promise.all(transactionRequests);
      for (let tx of transactions) {
        if (tx.confirmations !== undefined) {
          const monitor = monitoredTransactions.find(
            (m) => m.transactionId === tx.transaction
          );
          if (monitor) {
            dispatch(transactionActions.removeMonitor(tx.transaction));
          }
        }
      }
    },
    {
      refreshInterval: 30_000,
    }
  );

  return null;
};
