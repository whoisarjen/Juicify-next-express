import axios from "axios"
import { useState } from "react";
import { setToken } from "../redux/features/token.slice";
import { readToken } from "../utils/auth.utils";
import { useNotify } from "./useNotify";
import { useAppDispatch } from "./useRedux";

const useSettings = () => {
    const dispatch = useAppDispatch();
    const { success, error } = useNotify()
    const [isLoading, setIsLoading] = useState(false)

    const changeSettings = async (object: any) => {
        try {
            setIsLoading(true)
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER}/auth/change`,
                object,
                { withCredentials: true }
            );
            localStorage.setItem('token', JSON.stringify(await readToken(response.data.token)))
            dispatch(setToken(await readToken(response.data.token)));
            success()
        } catch (e: any) {
            error()
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    return { changeSettings, isLoading }
}


export default useSettings;