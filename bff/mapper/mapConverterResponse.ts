import { ConverterResponse, currency } from "@/bff/types/converterResponse";

export function mapConverterResponse(data: any): ConverterResponse {
  const responseItems = data.Items;

  const currencies = responseItems.map((item: any) => {
    const formattedCurrency: currency = {
      name: item.name.S,
      symbol: item.main.S,
      isCrypto: item.isCrypto.BOOL,
      price: item.price.S,
    };

    if (item?.featured?.BOOL) formattedCurrency.isFeatured = true;

    if (item?.description?.S)
      formattedCurrency.description = item.description.S;

    if (item?.maxTotalSupply?.S)
      formattedCurrency.maxTotalSupply = item.maxTotalSupply.S;

    if (item?.holders?.S) formattedCurrency.holders = item.holders.S;

    if (item?.trades?.S) formattedCurrency.trades = item.trades.S;

    if (item?.transfers?.S) formattedCurrency.transfers = item.transfers.S;

    return formattedCurrency;
  });

  return { currencies };
}
