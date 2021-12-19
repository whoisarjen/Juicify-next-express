import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { getShortDate } from "./manageDate";
import { deleteDatabaseIndexedDB } from "./indexedDB";

const logout = async () => {
    await deleteDatabaseIndexedDB();
    localStorage.clear();
    document.cookie = `token=''; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
    document.cookie = `refresh_token=''; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
    window.location.replace(`${window.location.origin}/login`)
}

const expectLoggedIN = () => {
    const router = useRouter();
    const [cookies] = useCookies(["token"]);

    useEffect(() => {
        if (!cookies.token) {
            router.push("/login");
        }
    }, []);
};

const expectLoggedOUT = () => {
    const router = useRouter();
    const [cookies] = useCookies(["token"]);
    const login = useSelector((state) => state.token.value.login);

    useEffect(() => {
        if (cookies.token) {
            router.push(`/${login}/nutrition-diary/${getShortDate()}`);
        }
    }, []);
};

const getCookie = async (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

const readToken = (token) => {
    if (!token) return ''
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

export {
    expectLoggedIN,
    expectLoggedOUT,
    readToken,
    logout,
    getCookie
};
