import { deleteDatabaseIndexedDB } from "./indexedDB";
import { setLastUpdated } from "./API";
import axios from "axios";

const logout = async () => {
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

const getCookie = async (name: string) => {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

const readToken = async (token: string) => {
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

export {
    readToken,
    logout,
    getCookie
};
