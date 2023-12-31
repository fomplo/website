import { useMemo, useEffect, useState } from "react";
import { currency } from "@/bff/types/converterResponse";
import { selectCrypto, selectSvalue } from "@/features/calculator/state";
import { useAppSelector } from "@/states/hooks";
import { tokenIds } from "@/lib/utils/currencies";
import { StatCard } from "./components/StatCard";

import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface Props {
  data: any;
}

export const Featured = ({ data }: Props) => {
  const selectedCrypto = useAppSelector(selectCrypto);
  const selectedSvalue = useAppSelector(selectSvalue);

  const [featuredCryptoData, setFeaturedCryptoData] = useState<currency>();

  const featuredCurrencies = useMemo(
    () => data?.currencies.filter((currency: currency) => currency.isFeatured),
    [data]
  );

  const handleFeaturedCrypto = () => {
    let foundCrypto: currency = {
      name: "",
      symbol: "",
      price: "",
      isCrypto: false,
    };

    try {
      if (featuredCurrencies && selectedCrypto) {
        featuredCurrencies.map((currency: currency) => {
          if (currency.symbol === selectedCrypto) {
            foundCrypto = currency;
          }

          if (!foundCrypto.name && currency.symbol === selectedSvalue) {
            foundCrypto = currency;
          }
        });
      }
    } finally {
      setFeaturedCryptoData(foundCrypto);
    }
  };

  useEffect(
    () => handleFeaturedCrypto(),
    [selectedCrypto, selectedSvalue, featuredCurrencies]
  );

  if (!featuredCryptoData || !featuredCryptoData.isFeatured) return null;

  return (
    <Paper variant="outlined" sx={{ width: "100%", p: 2, borderRadius: 2 }}>
      <Box display="flex" width="100%" flexDirection="column">
        <Box display="flex" flexDirection="row" alignItems="center" mb={0.5}>
          <Avatar
            src={`/assets/crypto/${featuredCryptoData.symbol}.png`}
            sx={{ border: 1, borderColor: "divider", mr: 1 }}
          />

          <Typography>{featuredCryptoData.name}</Typography>

          {featuredCryptoData.symbol !== featuredCryptoData.name && (
            <Typography color="textSecondary" sx={{ ml: 0.5 }}>
              ({featuredCryptoData.symbol})
            </Typography>
          )}
        </Box>

        {featuredCryptoData.description && (
          <Typography variant="body2" gutterBottom>
            {featuredCryptoData.description}
          </Typography>
        )}

        <Grid container direction="row" justifyContent="flex-start" spacing={2}>
          <Grid item xs={12} md={3}>
            <StatCard
              label="Circulating Supply"
              value={featuredCryptoData.maxTotalSupply || ""}
              background="linear-gradient(to right, #4776e6, #8e54e9)"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <StatCard
              label="Holders"
              value={featuredCryptoData.holders || ""}
              background="linear-gradient(to right, #24c6dc, #514a9d)"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <StatCard
              label="Trades"
              value={featuredCryptoData.trades || ""}
              background="linear-gradient(to right, #232526, #414345)"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <StatCard
              label="Transfers"
              value={featuredCryptoData.transfers || ""}
              background="linear-gradient(to right, #134e5e, #71b280)"
            />
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center">
            <Link
              target="_blank"
              href={
                "https://www.signumswap.com/tokens/" +
                // @ts-ignore
                tokenIds[featuredCryptoData.name]
              }
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<OpenInNewIcon />}
                sx={{ textTransform: "none" }}
              >
                Trade token on SignumSwap
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
