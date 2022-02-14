import axios from "axios"
import { setToken } from "../redux/features/token.slice";
import { readToken } from "../utils/auth.utils";
import { useNotify } from "./useNotify";
import { useAppDispatch } from "./useRedux";

const useSettings = () => {
    const dispatch = useAppDispatch();
    const [{ success, error }] = useNotify()

    const changeSettings = async (object: any) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER}/auth/change`,
                object,
                { withCredentials: true }
            );
            localStorage.setItem('token', JSON.stringify(await readToken(response.data.token)))
            dispatch(setToken(await readToken(response.data.token)));
            success()
            window.location.reload()
        } catch (e: any) {
            error()
            console.log(e)
        }
    }

    return { changeSettings }
}


export default useSettings;