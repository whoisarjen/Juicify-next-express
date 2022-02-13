import { is_id } from '../utils/db.utils'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getIndexedDBbyID } from '../utils/indexedDB.utils'
import { useDailyMeasurement } from './useDailyMeasurement'
import { reverseDateDotes } from '../utils/date.utils'
import { useAppSelector } from './useRedux'
import { loadMissingDataForWorkoutResult } from '../utils/workoutResult.utils'

const useWorkoutResult = (): [any, () => void] => {
    const router: any = useRouter()
    const [reload, setReload] = useState(0)
    const [data, setData] = useState(false)
    const [{ data: daily, user }] = useDailyMeasurement(router.query.date, router.query.login)
    const token: any = useAppSelector(state => state.token.value)

    useEffect(() => {
        (async () => {
            if (daily) {
                let res: any = {}
                if (token.login == router.query.login) {
                    let cache = await getIndexedDBbyID('workout_result', router.query.id)
                    if (cache) {
                        res = [cache]
                    } else {
                        res = daily.workout_result.filter((workout: any) => workout._id == router.query.id)
                        if (res?.length == 0) router.push(`/${router.query.login}/workout/results`)
                    }
                    let workout_description = await getIndexedDBbyID('workout_plan', res[0].workout_plan_ID)
                    res = loadMissingDataForWorkoutResult({ whenAdded: reverseDateDotes(daily.whenAdded), object: res[0], workout_description })
                } else {
                    if (await is_id(router.query.id)) {
                        res = daily.workout_result.filter((workout: any) => workout._id == router.query.id)
                        if (res?.length == 0) router.push(`/${router.query.login}/workout/results`)
                        res = loadMissingDataForWorkoutResult({ whenAdded: reverseDateDotes(daily.whenAdded), object: res[0] })
                    } else {
                        router.push(`/${router.query.login}/workout/results`)
                    }
                }
                setData(res)
            }
        })()
    }, [daily, reload, router.query])

    return [{ data, user, daily }, () => setReload(reload + 1)]
}

export default useWorkoutResult;