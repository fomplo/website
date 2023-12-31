import { useEffect, useRef } from "react";
import {
  ExtensionWalletError,
  GenericExtensionWallet,
  WalletConnection,
} from "@signumjs/wallets";
import { useAppContext } from "@/lib/hooks/useAppContext";
import { useSnackbar } from "@/lib/hooks/useSnackbar";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { actions as appActions } from "@/lib/states/appState";
import {
  actions as walletActions,
  selectIsWalletConnected,
} from "@/lib/states/walletState";
import { requestWalletConnection } from "@/lib/utils/requestWalletConnection";

const rememberWalletConnectionKey = "rememberWalletConnection";

export const WalletInitializer = () => {
  const dispatch = useAppDispatch();
  const { Ledger, Wallet, DAppName } = useAppContext();
  const { showWarning } = useSnackbar();
  const {
    setSignTransactionModal,
    setWalletSetupModal,
    setWalletWrongNetworkModal,
  } = appActions;
  const {
    setIsWalletConnected,
    setWatchOnly,
    setWalletNodeHost,
    setWalletPublicKey,
  } = walletActions;
  const isWalletConnected = useAppSelector(selectIsWalletConnected);
  const connectionRef = useRef<WalletConnection | null>(null);
  const rememberConnection = !!(
    localStorage.getItem(rememberWalletConnectionKey) &&
    localStorage.getItem(rememberWalletConnectionKey) === "yes"
  );

  const addRememberStatus = () =>
    localStorage.setItem(rememberWalletConnectionKey, "yes");

  const removeRememberStatus = () =>
    localStorage.removeItem(rememberWalletConnectionKey);

  const onWalletConnected = (connection: WalletConnection) => {
    dispatch(setIsWalletConnected(true));
    dispatch(setWatchOnly(connection.watchOnly));
    dispatch(setWalletNodeHost(connection.currentNodeHost));
    dispatch(setWalletPublicKey(connection.publicKey || ""));
    addRememberStatus();
  };

  useEffect(() => {
    let listener: any = null;

    const handleDisconnectWallet = () => {
      listener && listener.unlisten();
      connectionRef.current = null;
      dispatch(setIsWalletConnected(false));
      dispatch(setWatchOnly(false));
      dispatch(setWalletNodeHost(""));
      dispatch(setWalletPublicKey(""));
      removeRememberStatus();
      Wallet.Extension = new GenericExtensionWallet();
    };

    const onNetworkChange = (args: any) => {
      if (args.networkName === Ledger.Network) {
        dispatch(setWalletNodeHost(args.networkHost));
        if (isWalletConnected) requestWalletConnection();
        return;
      }

      showWarning(
        "You just selected a host from another network in your wallet."
      );
    };

    const onAccountChange = (args: any) => {
      dispatch(setWalletPublicKey(args.accountPublicKey));
      dispatch(setWatchOnly(args.watchOnly));
      showWarning("You just selected another account in your wallet.");
    };

    const onPermissionOrAccountRemoval = () => {
      showWarning(
        "You just removed the connected account or permission in your wallet."
      );
      handleDisconnectWallet();
    };

    const handleExtensionErrors = (e: ExtensionWalletError) => {
      switch (e.name) {
        case "NotFoundWalletError":
          dispatch(setWalletSetupModal(true));
          break;
        case "InvalidNetworkError":
          dispatch(setWalletWrongNetworkModal(true));
          break;
        case "NotGrantedWalletError":
          showWarning("Wallet interaction canceled by user");
          removeRememberStatus();
          break;

        default:
          // unexpected error
          console.error(e);
          break;
      }
    };

    const handleStartSigning = () => {
      dispatch(setSignTransactionModal(true));
    };

    const handleEndSigning = () => {
      dispatch(setSignTransactionModal(false));
    };

    const handleConnectWallet = async () => {
      if (connectionRef.current) return;

      try {
        const connection = await Wallet.Extension.connect({
          appName: DAppName,
          networkName: Ledger.Network,
        });

        onWalletConnected(connection);

        listener = connection.listen({
          onNetworkChanged: onNetworkChange,
          onAccountChanged: onAccountChange,
          onPermissionRemoved: onPermissionOrAccountRemoval,
          onAccountRemoved: onPermissionOrAccountRemoval,
        });

        connectionRef.current = connection;
      } catch (e) {
        if (e instanceof ExtensionWalletError) {
          handleExtensionErrors(e);
        } else {
          console.error(e);
        }
      }
    };

    window.addEventListener("connect-wallet", handleConnectWallet);
    window.addEventListener("disconnect-wallet", handleDisconnectWallet);
    window.addEventListener("wallet-sign-start", handleStartSigning);
    window.addEventListener("wallet-sign-end", handleEndSigning);

    if (rememberConnection) {
      requestWalletConnection();
    }

    return () => {
      listener && listener.unlisten();
      window.removeEventListener("connect-wallet", handleConnectWallet);
      window.removeEventListener("disconnect-wallet", handleDisconnectWallet);
      window.removeEventListener("wallet-sign-start", handleStartSigning);
      window.removeEventListener("wallet-sign-end", handleEndSigning);
    };
  }, [rememberConnection]);

  return null;
};
