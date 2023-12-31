type showError = (value: string) => void;
type setErrorFeedback = (value: string) => void;

export const transactionError = (
  e: any,
  showError: showError,
  setErrorFeedback?: setErrorFeedback
) => {
  switch (e?.name || e?.data?.errorCode) {
    // Error expected from the wallet
    case "NotGrantedWalletError":
      showError("Wallet interaction canceled by user");
      break;

    // Error expected from the node
    // "Incorrect amount"
    case 4:
      showError("Invalid amount, please input a valid amount");
      break;

    // Error expected from the node
    // "Incorrect amount"
    case 5:
      showError(
        "Unknown account, make sure you are using an activated account"
      );
      break;

    // "Not enough funds"
    case 6:
      if (!setErrorFeedback) {
        return showError("Your account does not have enough funds available");
      }

      setErrorFeedback("Your account does not have enough funds available");
      break;

    default:
      // unexpected error
      console.error(e);
      showError("Error, Code #" + e?.data?.errorCode || e?.errorCode);
      break;
  }
};
