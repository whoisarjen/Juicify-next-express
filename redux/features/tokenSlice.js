import { createSlice } from "@reduxjs/toolkit";
import { readToken } from "../../hooks/useAuth";

const initialState = {
  value: {},
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.value = readToken(action.payload);
    },
    removeToken: (state) => {
      state.value = {};
    },
  },
});

export const { setToken, removeToken } = tokenSlice.actions;

export default tokenSlice.reducer;
