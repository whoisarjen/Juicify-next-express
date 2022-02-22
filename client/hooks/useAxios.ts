import axios from "axios";
import { useNotify } from "./useNotify";

interface getProps {
    url: string
}

interface postProps {
    object: any
    url: string
}

interface deleteProps {
    url: string
}

const useAxios = () => {
    const { error } = useNotify()

    const get = async ({ url }: getProps) => {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER}${url}`, { withCredentials: true });
    }

    const post = async ({ object, url }: postProps) => {
        try {
            return await axios.post(`${process.env.NEXT_PUBLIC_SERVER}${url}`, object, { withCredentials: true });
        } catch (err: any) {
            if (err.response.data) {
                console.log(err.response.data)
                error(err.response.data)
            }
            throw err;
        }
    }

    const axiosDelete = async ({ url }: deleteProps) => {
        return await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}${url}`, { withCredentials: true });
    }

    return { get, post, axiosDelete }
}

export default useAxios;