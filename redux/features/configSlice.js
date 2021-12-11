import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  domainAdress: "https://juicify.app",
  isOnline: false,
  requiredBasicInputLength: (value) => {
    if (2 < value.length && value.length < 41) {
      return {
        status: true,
      };
    } else {
      return {
        status: false,
      };
    }
  },
};

export const configSlice = createSlice({
  name: "config",
  initialState,
});

export default configSlice.reducer;
