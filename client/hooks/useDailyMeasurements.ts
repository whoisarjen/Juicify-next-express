import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import { getAllIndexedDB } from '../utils/indexedDB.utils';
import { addDaysToDate } from '../utils/date.utils';
import { loadValueByLogin } from '../utils/db.utils';
import DailyMeasurementProps from '../interfaces/dailyMeasurement.interface';
import { useAppSelector } from './useRedux';
import { loadMissingDays } from '../utils/dailyMeasurement.utils';

const useDailyMeasurements = (today: Date | string, howManyDays: number = 7, login: string) => {
    const [reload, setReload] = useState(0)
    const [data, setData] = useState<Array<DailyMeasurementProps>>([])
    const [user, setUser] = useState('')
    const router = useRouter()
    const token: any = useAppSelector(state => state.token.value)
    const reloadKey = useAppSelector(state => state.key.daily_measurement)

    useEffect(() => {
        (async () => {
            if (login) {
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
    }, [reload, router.query, reloadKey])

    return [{ data, user }, () => setReload(reload + 1)];
}

export { useDailyMeasurements, loadMissingDays };