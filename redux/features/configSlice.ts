import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    domainAdress: "https://juicify.app",
    isOnline: false,
    theOldestSupportedDate: () => new Date((new Date()).setDate((new Date()).getDate() - 28)).toJSON().slice(0, 10),
    requireMealNumber: (value: any) => {
        if (0 < parseInt(value) && parseInt(value) < 11) {
            return true
        } else {
            return false
        }
    },
    requireHeightNumber: (value: any) => {
        if (120 < parseInt(value) && parseInt(value) < 250) {
            return true
        } else {
            return false
        }
    },
    requireNumberDiffrentThanZero: (value: any) => {
        if (0 < parseInt(value) || parseInt(value) < 0) {
            return true
        } else {
            return false
        }
    },
    requiredBasicInputNumber: (value: any) => {
        if (0 < value && value <= 10000) {
            return true
        } else {
            return false
        }
    },
    requiredBasicInputNumber0TO100: (value: any) => {
        if (0 <= value && value <= 100) {
            return true
        } else {
            return false
        }
    },
    numberOnlyPositive: (value: any) => {
        if (!value || (0 <= value && value <= 10000)) {
            return true
        } else {
            return false
        }
    },
    basicInputLength: (value: string) => {
        if (!value || (0 <= value.length && value.length <= 255)) {
            return true
        } else {
            return false
        }
    },
    requiredBasicInputLength: (value: string) => {
        if (2 < value.length && value.length < 41) {
            return true
        } else {
            return false
        }
    }
};

export const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {}
});

export default configSlice.reducer;
