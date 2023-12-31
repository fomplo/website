import { useState, useEffect } from "react";
import { DescriptorData } from "@signumjs/standards";
import { useAppSelector } from "@/states/hooks";
import { useAccount } from "@/lib/hooks/useAccount";
import { selectIsWalletConnected } from "@/lib/states/walletState";
import { asRSAddress } from "@/lib/utils/accountAddress";
import { requestWalletDisconnection } from "@/lib/utils/requestWalletConnection";

import useSWR from "swr";
import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

// @ts-ignore
import hashicon from "hashicon";

export const AccountCard = () => {
  const { accountId, description, watchOnly } = useAccount();
  const isWalletConnected = useAppSelector(selectIsWalletConnected);

  const [imageSrcUrl, setImageSrcUrl] = useState("");

  const { data: ipfsUrl } = useSWR(
    isWalletConnected && accountId ? `account/avatar/${accountId}` : null,
    async () => {
      if (!description) return null;

      try {
        const descriptor = DescriptorData.parse(description, false);
        if (descriptor.avatar) {
          return `https://ipfs.io/ipfs/${descriptor.avatar.ipfsCid}`;
        }
      } catch (e: any) {
        return null;
      }
    }
  );

  useEffect(() => {
    if (!accountId) return;
    const url = hashicon(accountId, { size: 32 }).toDataURL();
    setImageSrcUrl(url);
  }, [accountId]);

  useEffect(() => {
    if (!ipfsUrl) return;
    setImageSrcUrl(ipfsUrl);
  }, [ipfsUrl]);

  if (!isWalletConnected) return null;

  return (
    <Stack direction="column" width="100%">
      <Stack direction="row" alignItems="center">
        <Avatar
          src={imageSrcUrl}
          sx={{ width: 32, height: 32, mx: 1 }}
          variant="rounded"
        />

        {accountId && (
          <Typography fontWeight={500} color="textSecondary">
            {asRSAddress(accountId)}
          </Typography>
        )}
      </Stack>

      {watchOnly && (
        <Alert severity="warning" sx={{ my: 1 }}>
          You are using a watch-only account
        </Alert>
      )}

      <Button
        onClick={requestWalletDisconnection}
        startIcon={<LogoutIcon />}
        fullWidth
        sx={{ textTransform: "none" }}
      >
        Disconnect Wallet
      </Button>
    </Stack>
  );
};
