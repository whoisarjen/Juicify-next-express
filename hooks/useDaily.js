import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { useCookies } from "react-cookie"
import { useState, useEffect } from 'react'
import { readToken } from "../utils/checkAuth"
import { getIndexedDBbyID } from "../utils/indexedDB"
import { loadOneDailyMeasurementByLogin } from '../utils/API'

const useDailyMeasurement = (when) => {
    const router = useRouter()
    const [cookies] = useCookies()
    const [user, setUser] = useState()
    const [reload, setReload] = useState(0)
    const [dataObject, setDataObject] = useState()
    const theOldestSupportedDate = useSelector(state => state.config.theOldestSupportedDate())

    useEffect(async () => {
        if (when) {
            const user = readToken(cookies.token)
            if (user.login == router.query.login && theOldestSupportedDate <= when) {
                let dataObject = await getIndexedDBbyID('daily_measurement', new Date(when).toISOString())
                if (!dataObject) {
                    console.log('creating')
                    dataObject = {
                        _id: 'XD' + new Date().getTime(),
                        whenAdded: new Date(when).toISOString(),
                        user_ID: user._id,
                        nutrition_diary: [],
                        workout_result: []
                    }
                } else {
                    console.log("From cache")
                    if (!dataObject.nutrition_diary) dataObject.nutrition_diary = []
                    if (!dataObject.workout_results) dataObject.workout_results = []
                }
                setUser(user)
                setDataObject(dataObject)
            } else {
                const res = await loadOneDailyMeasurementByLogin(when, router.query.login)
                console.log('Guest', res)
                setUser(res.user)
                setDataObject(res.dataObject)
            }
        }
    }, [when, reload])

    return [{ dataObject, user }, () => setReload(reload + 1)]
}

export { useDailyMeasurement }