export const signStartWalletEvent = () =>
  window.dispatchEvent(new Event("wallet-sign-start"));

export const signEndWalletEvent = () =>
  window.dispatchEvent(new Event("wallet-sign-end"));
