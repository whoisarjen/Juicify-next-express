import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false,
};

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken: (state, action) => {
            try{
                state.value = JSON.parse(action.payload)
            }catch{
                state.value = JSON.parse(JSON.stringify(action.payload))
            }
        },
        removeToken: (state) => {
            state.value = false;
        },
    },
});

export const { setToken, removeToken } = tokenSlice.actions;

export default tokenSlice.reducer;
