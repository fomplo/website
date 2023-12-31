import {
  AnyAction,
  configureStore,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
  PersistConfig,
} from "redux-persist";
import { storage } from "./storage";

import { appSlice } from "@/lib/states/appState";
import { walletSlice } from "@/lib/states/walletState";
import { calculatorSlice } from "@/features/calculator/state";
import { transactionSlice } from "@/lib/states/transactionState";

import isClientSide from "@/lib/utils/isClientSide";

function persist<T = any>(config: PersistConfig<any>, reducer: Reducer) {
  return isClientSide()
    ? persistReducer<T, AnyAction>(config, reducer)
    : reducer;
}

const appPersistConfig: PersistConfig<any> = {
  key: "app",
  version: 1,
  storage,
  whitelist: [],
};

const walletPersistConfig: PersistConfig<any> = {
  key: "wallet",
  version: 1,
  storage,
  whitelist: [],
};

const calculatorPersistConfig: PersistConfig<any> = {
  key: "calculator",
  version: 1,
  storage,
  // persist only the mentioned fields.
  whitelist: ["crypto", "sValue"],
};

const transactionPersistConfig: PersistConfig<any> = {
  key: "transaction",
  version: 1,
  storage,
  whitelist: ["monitoredTransactions"],
};

const rootReducer = combineReducers({
  appState: persist<ReturnType<typeof appSlice.reducer>>(
    appPersistConfig,
    appSlice.reducer
  ),
  walletState: persist<ReturnType<typeof walletSlice.reducer>>(
    walletPersistConfig,
    walletSlice.reducer
  ),
  calculatorState: persist<ReturnType<typeof calculatorSlice.reducer>>(
    calculatorPersistConfig,
    calculatorSlice.reducer
  ),
  transactionState: persist<ReturnType<typeof transactionSlice.reducer>>(
    transactionPersistConfig,
    transactionSlice.reducer
  ),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const storePersistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
