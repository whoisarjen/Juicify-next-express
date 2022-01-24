import axios from "axios"

const useSettings = () => {

    const changeSettings = async (object: any) => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER}/auth/change`,
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