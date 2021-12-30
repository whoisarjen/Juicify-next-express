import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import { getAllIndexedDB } from '../utils/indexedDB';
import { useAppSelector } from "./useRedux";
import schema from "../schema/dailyMeasurement";
import { addDaysToDate } from '../utils/manageDate';
import { loadValueByLogin } from '../utils/API';

const useDailyMeasurements = (today, howManyDays = 7) => {
    const [reload, setReload] = useState(0)
    const [data, setData] = useState<Array<any>>([])
    const [user, setUser] = useState('')
    const router = useRouter()
    const token: any = useAppSelector(state => state.token.value)

    const loadMissingDays = async (oryginalArray, user_ID) => {
        return new Promise(resolve => {
            let newArray = []
            let checkingDate = JSON.parse(JSON.stringify(today))
            let array = JSON.parse(JSON.stringify(oryginalArray))
            if (array.length > 0) {
                array = array.sort((a, b) => {
                    if (a.whenAdded < b.whenAdded) {
                        return 1
                    } else {
                        return -1
                    }
                })
            }
            let object = {}
            for (let i = 0; i < array.length; i++) {
                object[array[i].whenAdded] = array[i]
            }
            for (let i = 0; i < howManyDays; i++) {
                if (object[checkingDate]) {
                    newArray.push(schema(object[checkingDate], "XD" + new Date().getTime() + i, checkingDate, user_ID))
                } else {
                    newArray.push(schema(false, "XD" + new Date().getTime() + i, checkingDate, user_ID))
                }
                checkingDate = new Date(addDaysToDate(checkingDate, -1)).toJSON()
            }
            resolve(newArray)
        })
    }

    useEffect(() => {
        (async () => {
            if (token && token.login == router.query.login) {
                let res = await getAllIndexedDB('daily_measurement')
                res = await loadMissingDays(res, token._id)
                setData(res)
                setUser(token)
            } else {
                let res = await loadValueByLogin(
                    "daily_measurements",
                    addDaysToDate(today, -howManyDays),
                    router.query.login.toString()
                );
                setUser(res.user)
                res = await loadMissingDays(res.data, res.user._id)
                setData(res)
            }
        })()
    }, [token, reload, router.query])

    return [{ data, user }, () => setReload(reload + 1)];
}

export { useDailyMeasurements };