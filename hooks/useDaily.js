import { readToken } from "../utils/checkAuth"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { useCookies } from "react-cookie"
import { useState, useEffect } from 'react'
import { getIndexedDBbyID } from "../utils/indexedDB"

const useDailyMeasurement = (when) => {
    const router = useRouter()
    const [cookies] = useCookies()
    const [diary, setDiary] = useState()
    const [reload, setReload] = useState(0)
    const theOldestSupportedDate = useSelector(state => state.config.theOldestSupportedDate())

    const loadDailyMeasurementFromAPI = async () => {
        return {
            _id: 'XD' + new Date().getTime(),
            whenAdded: new Date(when).toISOString(),
            user_ID: null,
            nutrition_diary: [],
            workout_result: []
        }
    }

    useEffect(async () => {
        if (when) {
            const token = readToken(cookies.token)
            if (token.login == router.query.login) {
                if (theOldestSupportedDate <= when) {
                    let daily = await getIndexedDBbyID('daily_measurement', new Date(when).toISOString())
                    if (!daily) {
                        console.log('creating')
                        daily = {
                            _id: 'XD' + new Date().getTime(),
                            whenAdded: new Date(when).toISOString(),
                            user_ID: token._id,
                            nutrition_diary: [],
                            workout_result: []
                        }
                    } else {
                        console.log("From cache")
                        if (!daily.nutrition_diary) daily.nutrition_diary = []
                        if (!daily.workout_results) daily.workout_results = []
                    }
                    setDiary(daily)
                } else {
                    console.log('Not in theOldestSupportedDate')
                    setDiary(await loadDailyMeasurementFromAPI())
                }
            } else {
                console.log('Guest')
                setDiary(await loadDailyMeasurementFromAPI())
            }
        }
    }, [when, reload])

    return [diary, () => setReload(reload + 1)]
}

export { useDailyMeasurement }