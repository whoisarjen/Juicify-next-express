import axios from "axios";
import { useRouter } from "next/router";

const useOtherUser = () => {
    const router: any = useRouter()

    const loadValueByLogin = async (where: string, find: any, login: string = find) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/guest/${where}`, { find, login }, { withCredentials: true });
            return res.data;
        } catch (error: any) {
            const errorCode = error.toJSON().status;
            if (errorCode === 403) router.push(`/403`)
            if (errorCode === 404) router.push(`/404`)
            return {
                user: {},
                data: []
            }
        }
    }

    return { loadValueByLogin };
}

export default useOtherUser;