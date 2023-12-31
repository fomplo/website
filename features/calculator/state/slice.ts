import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialType {
  crypto: string;
  sValue: string;
}

export const initialState: InitialType = {
  crypto: "",
  sValue: "",
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    setCrypto: (state, action: PayloadAction<string>) => {
      state.crypto = action.payload;
    },
    setSValue: (state, action: PayloadAction<string>) => {
      state.sValue = action.payload;
    },
    reset: () => initialState,
  },
});

export const { actions } = calculatorSlice;
