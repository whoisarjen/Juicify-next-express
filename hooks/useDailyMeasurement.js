import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { useCookies } from "react-cookie"
import { useState, useEffect } from 'react'
import { readToken } from "../utils/checkAuth"
import { getIndexedDBbyID } from "../utils/indexedDB"
import { loadValueByLogin } from '../utils/API'

const useDailyMeasurement = (when) => {
    const router = useRouter()
    const [cookies] = useCookies()
    const [user, setUser] = useState()
    const [reload, setReload] = useState(0)
    const [data, setDataObject] = useState()
    const theOldestSupportedDate = useSelector(state => state.config.theOldestSupportedDate())

    useEffect(async () => {
        if (when) {
            const token = readToken(cookies.token)
            if (token.login == router.query.login && theOldestSupportedDate <= when) {
                let data = await getIndexedDBbyID('daily_measurement', new Date(when).toISOString())
                if (!data) {
                    data = {
                        _id: 'XD' + new Date().getTime(),
                        whenAdded: new Date(when).toISOString(),
                        user_ID: token._id,
                        nutrition_diary: [],
                        workout_result: []
                    }
                } else {
                    if (!data.nutrition_diary) data.nutrition_diary = []
                    if (!data.workout_result) data.workout_result = []
                }
                setUser(token)
                setDataObject(data)
            } else {
                let res = await loadValueByLogin('daily_measurement', when, router.query.login)
                if (!res.data.nutrition_diary) res.data.nutrition_diary = []
                if (!res.data.workout_result) res.data.workout_result = []
                setUser(res.user)
                setDataObject(res.data)
            }
        }
    }, [when, reload])

    return [{ data, user }, () => setReload(reload + 1)]
}

export { useDailyMeasurement }