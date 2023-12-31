export const storageKey = "recentOptions";

type recentOptionType = {
  currency: string;
  isCrypto: boolean;
};

export const recentOptionsHandler = (currency: string, isCrypto: boolean) => {
  let recentOptions = localStorage.getItem(storageKey);

  if (!recentOptions) {
    const newOptions = [{ currency, isCrypto }];
    return localStorage.setItem(storageKey, JSON.stringify(newOptions));
  }

  // Format stringified value to array
  recentOptions = JSON.parse(recentOptions);

  // Look for similar keys
  // @ts-ignore
  recentOptions = recentOptions.filter(
    (option: recentOptionType) => option.currency !== currency
  );

  // If there are more than 15 currencies delete last key
  // @ts-ignore
  if (recentOptions?.length > 15) recentOptions.pop();

  // Add currency at start of array
  // @ts-ignore
  recentOptions.unshift({ currency, isCrypto });

  return localStorage.setItem(storageKey, JSON.stringify(recentOptions));
};
