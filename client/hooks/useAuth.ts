import { useRouter } from "next/router";
import { getCookie } from "../utils/auth.utils";
import { deleteDatabaseIndexedDB } from "../utils/indexedDB.utils";
import useAxios from "./useAxios";
import { useAppSelector } from "./useRedux";

const useAuth = () => {
    const { axiosDelete } = useAxios()
    const router: any = useRouter()
    const token: any = useAppSelector(state => state.token.value)

    const logout = async () => {
        try {
            await axiosDelete({ url: '/auth/logout' })
            await deleteDatabaseIndexedDB();
            const isDarkMode = localStorage.getItem('isDarkMode');
            localStorage.clear();
            if (isDarkMode) {
                localStorage.setItem('isDarkMode', isDarkMode)
            }
            window.location.replace(`${window.location.origin}${await getCookie('NEXT_LOCALE') == 'en' ? '' : '/' + await getCookie('NEXT_LOCALE')}/login`) // Need to hard reset indexedDB
        } catch (e: any) {
            console.log(e.message)
        }
    }

    const isOwner = (() => {
        if (router.query.login && token.login && router.query.login == token.login) {
            return true;
        }

        return false;
    })()

    return { logout, isOwner }
}

export default useAuth;