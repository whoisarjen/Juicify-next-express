import { useState, useEffect } from "react";
import { getAllIndexedDB } from "../utils/indexedDB";

const useWorkoutResults = () => {
    const [data, setData] = useState(false)

    useEffect(async () => {
        setData(await getAllIndexedDB('workout_result'))
    }, [])

    return data;
}
 
export default useWorkoutResults;