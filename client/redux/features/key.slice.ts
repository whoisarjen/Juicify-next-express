import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    daily_measurement: 0,
    product: 0,
    exercise: 0,
    workout_plan: 0
};

export const keySlice = createSlice({
    name: "key",
    initialState,
    reducers: {
        refreshKey: (state: any, action: any) => {
            state[action.payload] = new Date().getTime()
        },
    },
});

export const { refreshKey } = keySlice.actions;

export default keySlice.reducer;
