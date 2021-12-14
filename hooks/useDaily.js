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
    const range = useSelector(state => state.config.range())

    const loadDailyMeasurementFromAPI = async () => {
        return {
            _id: 'XD' + new Date().getTime(),
            whenAdded: when,
            user_ID: null,
            nutrition_diary: [],
            workout_result: []
        }
    }

    useEffect(async () => {
        const token = readToken(cookies.token)
        if (token.login == router.query.login) {
            if (range <= when) {
                let daily = await getIndexedDBbyID('daily_measurement', when)
                if (!daily) {
                    console.log('creating')
                    daily = {
                        _id: 'XD' + new Date().getTime(),
                        whenAdded: when,
                        user_ID: token._id,
                        nutrition_diary: [],
                        workout_result: []
                    }
                }
                setDiary(daily)
            } else {
                console.log('Not in range')
                setDiary(await loadDailyMeasurementFromAPI())
            }
        } else {
            console.log('Guest')
            setDiary(await loadDailyMeasurementFromAPI())
        }
    }, [when, reload])

    return [diary, () => setReload(reload + 1)]
}

export { useDailyMeasurement }