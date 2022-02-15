import { deleteDatabaseIndexedDB } from "../utils/indexedDB.utils";
import useAxios from "./useAxios";

const useAuth = () => {
    const { axiosDelete } = useAxios()

    const logout = async () => {
        try {
            await axiosDelete({ url: '/auth/logout' })
            await deleteDatabaseIndexedDB();
            const isDarkMode = localStorage.getItem('isDarkMode');
            localStorage.clear();
            if (isDarkMode) {
                localStorage.setItem('isDarkMode', isDarkMode)
            }
            window.location.replace(`${window.location.origin}/login`) // Need to hard reset indexedDB
        } catch (e: any) {
            console.log(e.message)
        }
    }

    return { logout }
}

export default useAuth;