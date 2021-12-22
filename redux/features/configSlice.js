import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    domainAdress: "https://juicify.app",
    isOnline: false,
    theOldestSupportedDate: () => new Date((new Date()).setDate((new Date()).getDate() - 28)).toJSON().slice(0, 10),
    requireNumberDiffrentThanZero: (value) => {
        if(0 < parseInt(value) || parseInt(value) < 0){
            return true
        }else{
            return false
        }
    },
    requiredBasicInputNumber: (value) => {
        if (0 < value && value <= 10000) {
            return true
        } else {
            return false
        }
    },
    basicInputLength: (value) => {
        if (!value || (0 <= value.length && value.length <= 255)) {
            return true
        } else {
            return false
        }
    },
    requiredBasicInputLength: (value) => {
        if (2 < value.length && value.length < 41) {
            return true
        } else {
            return false
        }
    },
};

export const configSlice = createSlice({
    name: "config",
    initialState,
});

export default configSlice.reducer;
