import { useCookies } from "react-cookie"
import { API } from '../utils/API'

const useCoach = () => {
    const [, setCookie] = useCookies()

    const createDiet = async (object) => {
        const { response, isSuccess } = await API('/coach/create', {
            array: [object]
        })
        if(isSuccess){
            setCookie('refresh_token', response.data.refresh_token)
            setCookie('token', response.data.token)
        }
    }

    return [createDiet]
}


export default useCoach;