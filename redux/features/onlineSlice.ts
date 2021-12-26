import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOnline: false
};

export const onlineSlice = createSlice({
    name: "online",
    initialState,
    reducers: {
        setIsOnline: (state, action) => {
            state.isOnline = action.payload;
        }
    },
});

export const { setIsOnline } = onlineSlice.actions;

export default onlineSlice.reducer;
