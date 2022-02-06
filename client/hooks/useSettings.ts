import axios from "axios"
import { setToken } from "../redux/features/tokenSlice";
import { readToken } from "../utils/checkAuth";
import { useAppDispatch } from "./useRedux";

const useSettings = () => {
    const dispatch = useAppDispatch();

    const changeSettings = async (object: any) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER}/auth/change`,
                object,
                { withCredentials: true }
            );
            localStorage.setItem('token', JSON.stringify(await readToken(response.data.token)))
            dispatch(setToken(await readToken(response.data.token)));
            window.location.reload()
        } catch (error: any) {
            console.log(error)
        }
    }

    return [changeSettings]
}


export default useSettings;