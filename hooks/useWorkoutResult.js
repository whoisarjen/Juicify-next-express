import { is_id } from '../utils/API'
import { useRouter } from 'next/router'
import { useCookies } from "react-cookie"
import { useState, useEffect } from 'react'
import { readToken } from "../utils/checkAuth"
import { getIndexedDBbyID } from '../utils/indexedDB'
import { useDailyMeasurement } from './useDailyMeasurement'

const useWorkoutResult = () => {
    const router = useRouter()
    const [cookies] = useCookies()
    const [reload, setReload] = useState(0)
    const [data, setData] = useState(false)
    const [{ data: daily, user }] = useDailyMeasurement(router.query.date)

    useEffect(async () => {
        if (daily) {
            const token = readToken(cookies.token)
            if (token.login == router.query.login) {
                let res = {}
                let cache = await getIndexedDBbyID('workout_result', router.query.id)
                if (cache) {
                    res = cache
                } else {
                    res = daily.workout_result.filter(workout => workout._id == router.query.id)
                    if (res && res.length > 0) {
                        res = res[0]
                    } else {
                        router.push(`/${router.query.login}/workout-results`)
                    }
                }
                setData(res)
            } else {
                if (await is_id(router.query.id)) {
                    let res = {}
                    res = daily.workout_result.filter(workout => workout._id == router.query.id)
                    if (res && res.length > 0) {
                        res = res[0]
                        res.whenAdded = router.query.date
                    } else {
                        router.push(`/${router.query.login}/workout-results`)
                    }
                    setData(res)
                } else {
                    router.push(`/${router.query.login}/workout-results`)
                }
            }
        }
    }, [daily, reload])

    return [{ data, user, daily }, () => setReload(reload + 1)]
}

export default useWorkoutResult;