import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useAppSelector } from "../hooks/useRedux";
import { getShortDate } from "./manageDate";
import { deleteDatabaseIndexedDB } from "./indexedDB";
import { setLastUpdated } from "./API";
import axios from "axios";

const logout = async () => {
    await deleteDatabaseIndexedDB();
    const isDarkMode = localStorage.getItem('isDarkMode');
    localStorage.clear();
    if (isDarkMode) {
        localStorage.setItem('isDarkMode', isDarkMode)
    }
    document.cookie = `token=''; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
    document.cookie = `refresh_token=''; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
    window.location.replace(`${window.location.origin}/login`)
}

const expectLoggedIN = () => {
    // const router = useRouter();
    // const [cookies] = useCookies(["token"]);

    // useEffect(() => {
    //     if (!cookies.token) {
    //         router.push("/login");
    //     }
    // }, []);
};

const expectLoggedOUT = () => {
    // const router = useRouter();
    // const [cookies] = useCookies(["token"]);
    // const token: any = useAppSelector((state) => state.token.value);

    // useEffect(() => {
    //     if (cookies.token) {
    //         router.push(`/${token.login}/nutrition-diary/${getShortDate()}`);
    //     }
    // }, []);
};

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

const readToken = (token: string) => {
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
    expectLoggedIN,
    expectLoggedOUT,
    readToken,
    logout,
    getCookie
};
