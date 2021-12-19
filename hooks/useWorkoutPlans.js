import { useState, useEffect } from "react";
import { getAllIndexedDB } from "../utils/indexedDB";

const useWorkoutPlans = () => {
    const [data, setData] = useState(false)

    useEffect(async () => {
        setData(await getAllIndexedDB('workout_plan'))
    }, [])

    return data;
}
 
export default useWorkoutPlans;