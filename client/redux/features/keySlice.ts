import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    daily_measurement: 0,
};

export const keySlice = createSlice({
    name: "key",
    initialState,
    reducers: {
        refreshTodayDaily: (state) => {
            state.daily_measurement = new Date().getTime()
        },
    },
});

export const { refreshTodayDaily } = keySlice.actions;

export default keySlice.reducer;
