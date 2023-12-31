export interface NetworkResponse {
  blockHeight: string;
  price: string;
  testnetBlockHeight: string;
  version: string;
  smartContractsCreated: string;
  totalTransactions: string;
  aliasesCreated: string;
  tokensCreated: string;
  subscriptionsCreated: string;
  subscriptionPaymentsCount: string;
  burnedFunds: string;
  circulatingFunds: string;
  fees: { minimal: string; standard: string; priority: string };
}
