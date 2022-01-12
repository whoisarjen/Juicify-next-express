import { useCookies } from "react-cookie"
import { API } from '../utils/API'

const useSettings = () => {
    const [, setCookie] = useCookies()

    const changeSettings = async (object: any) => {
        const { response, isSuccess } = await API('/auth/change', {
            array: [object]
        })
        if(isSuccess){
            setCookie('refresh_token', response.data.refresh_token)
            setCookie('token', response.data.token)
        }
    }

    return [changeSettings]
}


export default useSettings;