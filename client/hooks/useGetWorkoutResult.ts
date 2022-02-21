import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useDailyMeasurement } from "./useDailyMeasurement"
import { useAppSelector } from "./useRedux"
import { reverseDateDotes } from "../utils/date.utils"
import { is_id } from "../utils/db.utils"
import { getIndexedDBbyID } from "../utils/indexedDB.utils"
import { loadMissingDataForWorkoutResult } from "../utils/workoutResult.utils"

const useGetWorkoutResult = (): any => {
    const router: any = useRouter()
    const [reload, setReload] = useState(0)
    const [data, setData] = useState(false)
    const { data: daily, user } = useDailyMeasurement(router.query.date, router.query.login)
    const token: any = useAppSelector(state => state.token.value)

    useEffect(() => {
        (async () => {
            if (daily?.workout_result) {
                let res: any = []
                if (token.login == router.query.login) {
                    let cache = await getIndexedDBbyID('workout_result', router.query.id)
                    if (cache) {
                        res = [cache]
                    } else {
                        res = daily.workout_result.filter((workout: any) => workout._id == router.query.id)
                        console.log(res.length)
                        if (res?.length == 0) router.push(`/${router.query.login}/workout/results`)
                    }
                    res = loadMissingDataForWorkoutResult({
                        whenAdded: reverseDateDotes(daily.whenAdded),
                        object: res[0],
                        workout_description: (await getIndexedDBbyID('workout_plan', res[0]?.workout_plan_ID || ''))?.description
                    })
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

    return { data, user, daily, reload: () => setReload(reload + 1) }
}

export type useGetWorkoutResultProps = ReturnType<typeof useGetWorkoutResult>

export default useGetWorkoutResult;