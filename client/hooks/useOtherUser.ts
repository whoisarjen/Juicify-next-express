import { useRouter } from "next/router";
import useAxios from "./useAxios";

const useOtherUser = () => {
    const { post } = useAxios()
    const router: any = useRouter()

    const loadValueByLogin = async (where: string, find: any, login: string = find) => {
        try {
            const res = await post({ object: { find, login }, url: `/guest/${where}` })
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