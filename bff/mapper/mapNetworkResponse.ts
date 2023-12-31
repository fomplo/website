import { NetworkResponse } from "@/bff/types/networkResponse";

export function mapNetworkResponse(data: any): NetworkResponse {
  const blockHeight = data.Item.blockHeight.S;
  const price = data.Item.price.S;
  const testnetBlockHeight = data.Item.testnetBlockHeight.S;
  const version = data.Item.version.S;

  const smartContractsCreated = data.Item.smartContractsCreated.S;
  const totalTransactions = data.Item.totalTransactions.S;
  const aliasesCreated = data.Item.aliasesCreated.S;
  const tokensCreated = data.Item.tokensCreated.S;
  const subscriptionsCreated = data.Item.subscriptionsCreated.S;
  const subscriptionPaymentsCount = data.Item.subscriptionPaymentsCount.S;
  const burnedFunds = data.Item.burnedFunds.S;
  const circulatingFunds = data.Item.circulatingFunds.S;

  const feeSuggestions = data.Item.fees.M;
  const fees = {
    minimal: feeSuggestions.minimal.S,
    standard: feeSuggestions.standard.S,
    priority: feeSuggestions.priority.S,
  };

  return {
    blockHeight,
    price,
    testnetBlockHeight,
    version,
    smartContractsCreated,
    totalTransactions,
    aliasesCreated,
    tokensCreated,
    subscriptionsCreated,
    subscriptionPaymentsCount,
    burnedFunds,
    circulatingFunds,
    fees,
  };
}
