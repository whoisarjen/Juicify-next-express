import axios from "axios"
import config from '../config/default'

const useSettings = () => {

    const changeSettings = async (object: any) => {
        try {
            await axios.post(
                `${config.server}/auth/change`,
                object,
                { withCredentials: true }
            );
            window.location.reload()
        } catch (error: any) {
            console.log(error)
        }
    }

    return [changeSettings]
}


export default useSettings;