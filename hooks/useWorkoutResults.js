import { useState, useEffect } from "react";
import { getAllIndexedDB } from "../utils/indexedDB";

const useWorkoutResults = () => {
    const [data, setData] = useState([])

    useEffect(async () => {
        let results = []
        let cache = await getAllIndexedDB('workout_result')
        let daily_measurements = await getAllIndexedDB('daily_measurement')
        if (daily_measurements.length > 0) {
            for (let i = 0; i < daily_measurements.length; i++) {
                if (daily_measurements[i].workout_result && daily_measurements[i].workout_result.length > 0) {
                    for (let a = 0; a < daily_measurements[i].workout_result.length; a++) {
                        results.push({ ...daily_measurements[i].workout_result[a], whenAdded: daily_measurements[i].whenAdded.slice(0, 10) })
                    }
                }
            }
        }
        if (results.length > 0) {
            if (cache.length > 0) {
                for (let i = 0; i < results.length; i++) {
                    for (let a = 0; a < cache.length; a++) {
                        if (cache[a]._id == results[i]._id) {
                            results[i] = cache[a]
                            results[i].notSaved = new Date().getTime()
                            break;
                        }
                    }
                }
            }
        } else {
            results = cache
        }
        console.log(results)
        setData(results)
    }, [])

    return data;
}

export default useWorkoutResults;