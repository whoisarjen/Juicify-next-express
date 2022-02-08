import { deleteDatabaseIndexedDB } from "./indexedDB.utils";
import { setLastUpdated } from "./db.utils";
import axios from "axios";

export const logout = async () => {
    try {
        await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER}/auth/logout`,
            {},
            { withCredentials: true }
        );
        await deleteDatabaseIndexedDB();
        const isDarkMode = localStorage.getItem('isDarkMode');
        localStorage.clear();
        if (isDarkMode) {
            localStorage.setItem('isDarkMode', isDarkMode)
        }
        window.location.replace(`${window.location.origin}/login`)
    } catch (e: any) {
        console.log(e.message)
    }
}

export const readToken = async (token: string) => {
    if (!token) return ''
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

export const refreshToken = async () => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}/auth/refresh`,
        {},
        { withCredentials: true }
    );
    setLastUpdated();
    return response.data.token
}

export const parseBoolean = (value: string | boolean): boolean => value.toString().toLowerCase() === 'true' ? true : false