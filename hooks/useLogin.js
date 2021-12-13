import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import useAPI from './useAPI'
import { useCookies } from "react-cookie";
import { useShortDate } from "./useDate";
import { createIndexedDB } from "./useIndexedDB";
import { setToken } from "../redux/features/tokenSlice";
import { readToken } from "./useAuth";
import { useDispatch, useSelector } from "react-redux";

const useLogin = ({ login = '', password = '' }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const dispatch = useDispatch();
    const [, setCookie] = useCookies(["token"]);
    const requiredBasicInputLength = useSelector(
        (state) => state.config.requiredBasicInputLength
    );

    useEffect(async () => {
        if (
            requiredBasicInputLength(login).status &&
            requiredBasicInputLength(password).status
        ) {
            setLoading(true);
            const { response, isSuccess } = await useAPI("/auth/login", {
                login,
                password,
            });
            if (isSuccess) {
                setCookie("token", response.token, {
                    path: "/",
                    expires: new Date(
                        new Date().setFullYear(new Date().getFullYear() + 20)
                    ),
                });
                setCookie("refresh_token", response.refresh_token, {
                    path: "/",
                    expires: new Date(
                        new Date().setFullYear(new Date().getFullYear() + 20)
                    ),
                });
                dispatch(setToken(response.token));
                await createIndexedDB();
                router.push(
                    `/${readToken(response.token).login
                    }/nutrition-diary/${useShortDate()}`
                );
            }
            setLoading(false);
        }
    }, [login, password])
    return { loading }
}

export default useLogin;