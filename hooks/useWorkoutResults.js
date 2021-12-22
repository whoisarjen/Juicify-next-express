import { useRouter } from "next/router";
import { useCookies } from "react-cookie"
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { readToken } from "../utils/checkAuth"
import { loadValueByLogin } from '../utils/API'
import { getAllIndexedDB } from "../utils/indexedDB";

const useWorkoutResults = () => {
    const router = useRouter()
    const [cookies] = useCookies()
    const [data, setData] = useState([])
    const [user, setUser] = useState({})
    const theOldestSupportedDate = useSelector(state => state.config.theOldestSupportedDate)

    useEffect(async () => {
        let results = []
        const token = readToken(cookies.token)
        if (token == router.query.login) {
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
                results = cache.map(x => {
                    x.notSaved = new Date().getTime()
                    return x
                })
            }
            setData(token)
            setData(results)
        } else {
            let response = await loadValueByLogin('daily_measurements', theOldestSupportedDate(), router.query.login)
            let results = []
            if (response.data && response.data.length > 0) {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].workout_result && response.data[i].workout_result.length > 0) {
                        for (let a = response.data[i].workout_result.length - 1; a >= 0; a--) {
                            results.push({ ...response.data[i].workout_result[a], whenAdded: response.data[i].whenAdded.slice(0, 10) })
                        }
                    }
                }
            }
            setData(results || {})
            setUser(response.user || [])
        }
    }, [])

    return { data, user };
}

export default useWorkoutResults;