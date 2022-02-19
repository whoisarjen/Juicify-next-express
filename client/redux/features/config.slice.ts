import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOnline: false,
    numberSupportedDays: 28,
    theOldestSupportedDate: () => new Date((new Date()).setDate((new Date()).getDate() - 28)).toJSON().slice(0, 10),
};

export const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {}
});

export default configSlice.reducer;
