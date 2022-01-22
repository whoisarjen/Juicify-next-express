import axios from "axios";
import { useCookies } from "react-cookie";
import config from '../config/default'

const useCoach = () => {
    const [, setCookie] = useCookies()

    const createDiet = async (object: any) => {
        try {
            const response = await axios.post(
                `${config.server}/coach/create`,
                { ...object },
                { withCredentials: true }
            );
            return response.data
        } catch (error: any) {
            console.log(error)
        }
    }

    const analyzeDiet = async (object: any) => {
        try {
            const response = await axios.post(
                `${config.server}/coach/analyze`,
                { ...object },
                { withCredentials: true }
            );
            return response.data
        } catch (error: any) {
            console.log(error)
        }
    }

    return [createDiet, analyzeDiet]
}


export default useCoach;