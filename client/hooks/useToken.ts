import useAxios from "./useAxios";
import { useAppDispatch } from "./useRedux";
import { readToken } from "../utils/auth.utils";
import { setToken } from "../redux/features/token.slice";

const useToken = () => {
    const { get } = useAxios();
    const dispatch = useAppDispatch()

    const dispatchToken = async (token: string) => {
        const tokenValue = await readToken(token)

        localStorage.setItem('token', JSON.stringify(tokenValue))
        dispatch(setToken(tokenValue));
    }

    const refreshToken = async () => {
        const response = await get({ url: '/auth/refresh' });
        await dispatchToken(response.data.token);
    }

    return { refreshToken, dispatchToken };
}

export default useToken;