import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import useOtherUser from "../../../../hooks/useOtherUser"
import { useAppSelector } from "../../../../hooks/useRedux"
import { WorkoutPlanSchemaProps } from "../../../../schema/workoutPlan.schema"
import { is_id } from "../../../../utils/db.utils"
import { getIndexedDBbyID } from "../../../../utils/indexedDB.utils"
import { loadMissingData } from "../../../../utils/workoutPlan.utils"

const useGetWorkoutPlanByID = (_id: string) => {
    const router: any = useRouter()
    const [user, setUser] = useState<any>({})
    const [reload, setReload] = useState(0)
    const [data, setData] = useState<WorkoutPlanSchemaProps>(loadMissingData({ _id: 'XD' + new Date().getTime(), user_ID: '', object: {} }))
    const token: any = useAppSelector(state => state.token.value)
    const reloadKey = useAppSelector(state => state.key.workout_plan)
    const { loadValueByLogin } = useOtherUser()

    useEffect(() => {
        (async () => {
            if (_id) {
                if (token.login == router.query.login) {
                    const workoutPlan: WorkoutPlanSchemaProps = await getIndexedDBbyID('workout_plan', _id)

                    if (!workoutPlan) {
                        router.push(`/${router.query.login}/workout/plans`)
                    }

                    setUser(token)
                    setData(loadMissingData({ _id: 'XD' + new Date().getTime(), user_ID: token._id, object: workoutPlan }))
                } else {
                    if (!await is_id(router.query.id)) {
                        router.push(`/${router.query.login}/workout/plans`)
                    }

                    let res = await loadValueByLogin('workout_plan', _id, router.query.login)

                    if (!res.data) {
                        router.push(`/${router.query.login}/workout/plans`)
                    }

                    setUser(res.user)
                    setData(loadMissingData({ _id: 'XD' + new Date().getTime(), user_ID: res.user._id, object: res.data }))
                }
            }
        })()
    }, [_id, reload, reloadKey])

    return { data, user, reload: () => setReload(reload + 1) }
}

export type useGetWorkoutPlanByIDProps = ReturnType<typeof useGetWorkoutPlanByID>

export default useGetWorkoutPlanByID;