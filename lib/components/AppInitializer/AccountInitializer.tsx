import { useEffect } from "react";
import { Amount } from "@signumjs/util";
import { Address } from "@signumjs/core";
import { useLedger } from "@/lib/hooks/useLedger";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { actions, selectWalletPublicKey } from "@/lib/states/walletState";

import useSWR from "swr";

export const AccountInitializer = () => {
  const { setAccount } = actions;
  const ledger = useLedger();
  const dispatch = useAppDispatch();
  const publicKey = useAppSelector(selectWalletPublicKey);

  const { data } = useSWR(
    ledger && publicKey ? `/fetchAccount/${publicKey}` : null,
    async () => {
      if (!(ledger && publicKey)) return;

      try {
        const accountId = Address.fromPublicKey(publicKey).getNumericId();

        return ledger.account.getAccount({
          accountId,
          includeCommittedAmount: true,
        });
      } catch (error) {
        return;
      }
    },
    {
      refreshInterval: 30_000,
    }
  );

  useEffect(() => {
    if (!ledger || !data) return;

    const {
      account,
      accountRS,
      name,
      description,
      balanceNQT,
      unconfirmedBalanceNQT,
      committedBalanceNQT,
    } = data;

    dispatch(
      setAccount({
        id: account,
        accountRS,
        name,
        description,
        totalBalance: Number(Amount.fromPlanck(balanceNQT || "0").getSigna()),
        availableBalance: Number(
          Amount.fromPlanck(unconfirmedBalanceNQT || "0").getSigna()
        ),
        committedBalance: Number(
          Amount.fromPlanck(committedBalanceNQT || "0").getSigna()
        ),
      })
    );
  }, [dispatch, data, ledger]);

  return null;
};
