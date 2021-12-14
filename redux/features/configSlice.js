import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    domainAdress: "https://juicify.app",
    isOnline: false,
    theOldestSupportedDate: () => new Date((new Date()).setDate((new Date()).getDate() - 28)).toJSON().slice(0, 10),
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
