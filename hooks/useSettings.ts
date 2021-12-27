import { useCookies } from "react-cookie"
import { API } from '../utils/API'

const useSettings = () => {
    const [, setCookie] = useCookies()

    const changeSettings = async (object) => {
        const { response, isSuccess } = await API('/auth/change', {
            array: [object]
        })
        if(isSuccess){
            setCookie('token', response.data.token)
            setCookie('refresh_token', response.data.refresh_token)
        }
    }

    const changePassword = async (object) => {
        console.log('changePassword')
    }

    return [changeSettings, changePassword]
}


export default useSettings;