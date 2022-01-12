import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import { getAllIndexedDB } from '../utils/indexedDB';
import { addDaysToDate } from '../utils/manageDate';
import { loadValueByLogin } from '../utils/API';
import { getCookie, readToken } from '../utils/checkAuth';
import DailyMeasurementProps from '../interfaces/dailyMeasurement';
import DailyMeasurement from '../classes/dailyMeasurement';

const loadMissingDays = async (oryginalArray: Array<DailyMeasurementProps>, user_ID: string, howManyDays: number, today: Date | string) => {
    return new Promise(resolve => {
        let newArray = []
        let checkingDate = JSON.parse(JSON.stringify(new Date(today)))
        let array = JSON.parse(JSON.stringify(oryginalArray))
        if (array.length > 0) {
            array = array.sort((a: DailyMeasurementProps, b: DailyMeasurementProps) => {
                if (a.whenAdded < b.whenAdded) {
                    return 1
                } else {
                    return -1
                }
            })
        }
        let object: any = {}
        for (let i = 0; i < array.length; i++) {
            object[array[i].whenAdded] = array[i]
        }
        for (let i = 0; i < howManyDays; i++) {
            newArray.push(
                new DailyMeasurement(
                    {
                        ...{ _id: "XD" + new Date().getTime() + i, user_ID, whenAdded: checkingDate },
                        ...object[checkingDate]
                    }
                )
            );
            checkingDate = new Date(addDaysToDate(checkingDate, -1)).toJSON()
        }
        resolve(newArray)
    })
}

const useDailyMeasurements = (today: Date | string, howManyDays: number = 7, login: string) => {
    const [reload, setReload] = useState(0)
    const [data, setData] = useState<Array<DailyMeasurementProps>>([])
    const [user, setUser] = useState('')
    const router = useRouter()

    useEffect(() => {
        (async () => {
            if (login) {
                const token = readToken(await getCookie('token') || '')
                if (token.login == (login || token.login)) { // Sometimes need to use only in token's user case and this block errors
                    let res = await getAllIndexedDB('daily_measurement')
                    res = await loadMissingDays(res, token._id, howManyDays, today)
                    setData(res)
                    setUser(token)
                } else {
                    let res = await loadValueByLogin(
                        "daily_measurements",
                        addDaysToDate(today, -howManyDays),
                        login.toString()
                    );
                    setUser(res.user)
                    res = await loadMissingDays(res.data, res.user._id, howManyDays, today)
                    setData(res)
                }
            }
        })()
    }, [reload, router.query])

    return [{ data, user }, () => setReload(reload + 1)];
}

export { useDailyMeasurements, loadMissingDays };