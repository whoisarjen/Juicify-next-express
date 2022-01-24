import axios from "axios";

const useCoach = () => {
    const createDiet = async (object: any) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER}/coach/create`,
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
                `${process.env.NEXT_PUBLIC_SERVER}/coach/analyze`,
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