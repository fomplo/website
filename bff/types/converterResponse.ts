export type currency = {
  name: string;
  symbol: string;
  isCrypto: boolean;
  price: string;
  isFeatured?: boolean;
  description?: string;
  maxTotalSupply?: string;
  holders?: string;
  trades?: string;
  transfers?: string;
};

export interface ConverterResponse {
  currencies: currency[];
}
