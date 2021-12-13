import { readToken } from "./useAuth"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { useCookies } from "react-cookie"
import { useState, useEffect } from 'react'
import { getIndexedDBbyID } from "./useIndexedDB"

const loadDailyMeasurement = (when) => {
    const router = useRouter()
    const [cookies] = useCookies()
    const [diary, setDiary] = useState()
    const range = useSelector(state => state.config.range())

    const loadDailyMeasurementFromAPI = async () => {
        return {
            whenAdded: when,
            user_ID: null,
            nutrition_diary: [],
            workout_result: []
        }
    }

    useEffect(async () => {
        if (cookies.token) {
            const token = readToken(cookies.token)
            if (token.login == router.query.login) {
                if (range <= when) {
                    let daily = await getIndexedDBbyID('daily_measurement', when)
                    if (!daily) {
                        console.log('creating')
                        daily = {
                            whenAdded: when,
                            user_ID: token._id,
                            nutrition_diary: [{
                                _id: 123,
                                meal: 1,
                                name: '123',
                                p: 1,
                                c: 2,
                                f: 3
                            }],
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
        }
    }, [when])

    return diary
}

export { loadDailyMeasurement }