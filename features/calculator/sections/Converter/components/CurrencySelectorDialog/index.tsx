import { useMemo, useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { currency } from "@/bff/types/converterResponse";
import { useAppDispatch } from "@/states/hooks";
import { actions } from "@/features/calculator/state";
import {
  storageKey,
  recentOptionsHandler,
} from "./components/recentOptionsHandler";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import DialogContent from "@mui/material/DialogContent";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import CurrencyCard from "./components/CurrencyCard";
import RecentOptionCard from "./components/RecentOptionCard";

interface Props {
  data: any;
  isOpen: boolean;
  mode: "left" | "right";
  onClose: () => void;
}

const CurrencySelectorDialog = ({ data, isOpen, mode, onClose }: Props) => {
  const { setCrypto, setSValue } = actions;
  const dispatch = useAppDispatch();
  const inputRef: any = useRef(null);

  const [recentOptions, setRecentOptions] = useState([]);

  const [currenciesToShow, setCurrenciesToShow] = useState<currency[]>([]);
  const [inputValue, setInputValue] = useState("");

  const fiatCurrencies = useMemo(
    () => data.filter((currency: currency) => !currency.isCrypto),
    [data]
  );

  const cryptoCurrencies = useMemo(
    () => data.filter((currency: currency) => currency.isCrypto),
    [data]
  );

  const featuredCurrencies = useMemo(
    () => data.filter((currency: currency) => currency.isFeatured),
    [data]
  );

  useEffect(() => {
    setInputValue("");

    if (isOpen) searchRecentOptions();

    if (isOpen && inputRef && !isMobile) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 200);
    }
  }, [isOpen]);

  const onChangeInput = (e: any) => setInputValue(e.currentTarget.value);

  useEffect(() => {
    searchCrypto();
  }, [inputValue]);

  const searchCrypto = () => {
    if (!inputValue) return setCurrenciesToShow(featuredCurrencies);

    let temporalCurrencies: currency[] = [];
    let tempText = inputValue.toLowerCase();

    if (mode == "left") {
      temporalCurrencies = cryptoCurrencies.filter(
        (currency: currency) =>
          currency.isCrypto &&
          (currency.symbol.toLowerCase().includes(tempText) ||
            currency.name.toLowerCase().includes(tempText))
      );

      return setCurrenciesToShow(temporalCurrencies);
    }

    if (mode == "right") {
      temporalCurrencies = [...cryptoCurrencies, ...fiatCurrencies].filter(
        (currency: currency) =>
          currency.symbol.toLowerCase().includes(tempText) ||
          currency.name.toLowerCase().includes(tempText)
      );

      return setCurrenciesToShow(temporalCurrencies);
    }

    return setCurrenciesToShow(temporalCurrencies);
  };

  const selectedCurrency = (currency: string) => {
    if (mode == "left") dispatch(setCrypto(currency));
    if (mode == "right") dispatch(setSValue(currency));

    onClose();
  };

  const saveCurrency = (currency: string, isCrypto: boolean) => {
    recentOptionsHandler(currency, isCrypto);
    onClose();
  };

  const searchRecentOptions = () => {
    let recentOptions = localStorage.getItem(storageKey);
    if (!recentOptions) return setRecentOptions([]);

    // Format stringified value to array
    recentOptions = JSON.parse(recentOptions);

    // @ts-ignore
    setRecentOptions(recentOptions);
  };

  const recentOptionsList = recentOptions.filter((option: any) => {
    if (mode == "left" && !option.isCrypto) return false;
    return true;
  });

  return (
    <Dialog onClose={onClose} open={isOpen} fullWidth maxWidth="sm">
      <DialogContent>
        <Box width="100%" display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="stretch"
            mb={1}
          >
            <TextField
              type="text"
              label="What are you looking for?"
              inputRef={inputRef}
              variant="outlined"
              sx={{ flex: 1 }}
              onChange={onChangeInput}
              value={inputValue}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                maxLength: 32,
              }}
            />

            <Button
              onClick={onClose}
              color="error"
              sx={{
                ml: 2,
                textTransform: "none",
              }}
            >
              Close
            </Button>
          </Box>

          <Box
            width="100%"
            maxHeight={400}
            sx={{ overflowX: "hidden", overflowY: "auto" }}
          >
            <List>
              {!inputValue && (
                <Typography fontWeight={500}>Featured ⭐</Typography>
              )}

              {!inputValue && (
                <Typography
                  fontSize={12}
                  fontWeight={500}
                  color="textSecondary"
                  gutterBottom
                >
                  Get your token featured here!
                </Typography>
              )}

              {currenciesToShow.map((item) => (
                <CurrencyCard
                  key={item.symbol}
                  name={item.name}
                  symbol={item.symbol}
                  onClick={() => {
                    selectedCurrency(item.symbol);
                    saveCurrency(item.symbol, item.isCrypto);
                  }}
                />
              ))}

              {!currenciesToShow.length && (
                <Typography align="center" color="textSecondary">
                  🔍 No results found
                </Typography>
              )}
            </List>
          </Box>

          {!!recentOptionsList.length && (
            <Box
              width="100%"
              pt={2}
              sx={{ borderTop: 1, borderColor: "divider" }}
            >
              <Box mb={1.5}>
                <Typography fontWeight={500}>Recent Options</Typography>
              </Box>

              <Grid
                container
                display="flex"
                flexWrap="wrap"
                flexDirection="row"
                justifyContent="flex-start"
                maxHeight={175}
                sx={{ overflowX: "hidden", overflowY: "auto" }}
                px={1}
                rowSpacing={2}
                columnSpacing={2}
                pb={1}
              >
                {recentOptionsList.map((option: any) => {
                  return (
                    <Grid
                      item
                      xs={6}
                      md={3}
                      display="flex"
                      key={option.currency}
                    >
                      <RecentOptionCard
                        symbol={option.currency}
                        onClick={() => {
                          selectedCurrency(option.currency);
                        }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CurrencySelectorDialog;
