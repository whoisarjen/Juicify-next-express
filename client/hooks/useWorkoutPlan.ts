import { is_id } from '../utils/db.utils'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getIndexedDBbyID } from '../utils/indexedDB.utils'
import { useAppSelector } from './useRedux'
import { loadMissingData } from '../utils/workoutPlan.utils'
import { WorkoutPlanSchemaProps } from '../schema/workoutPlan.schema'
import useOtherUser from './useOtherUser'

const useWorkoutPlan = (workoutPlanID: string) => {
    const router: any = useRouter()
    const [user, setUser] = useState({})
    const [reload, setReload] = useState(0)
    const [data, setData] = useState<WorkoutPlanSchemaProps>(loadMissingData({ _id: 'XD' + new Date().getTime(), user_ID: '', object: {} }))
    const token: any = useAppSelector(state => state.token.value)
    const reloadKey = useAppSelector(state => state.key.workout_plan)
    const { loadValueByLogin } = useOtherUser()

    useEffect(() => {
        (async () => {
            if (workoutPlanID) {
                if (token.login == router.query.login) {
                    const workoutPlan: WorkoutPlanSchemaProps = await getIndexedDBbyID('workout_plan', workoutPlanID)
                    if (workoutPlan) {
                        setUser(token)
                        setData(
                            loadMissingData({
                                _id: 'XD' + new Date().getTime(),
                                user_ID: token._id,
                                object: workoutPlan
                            })
                        )
                    } else {
                        router.push(`/${router.query.login}/workout-plans`)
                    }
                } else {
                    if (await is_id(router.query.id)) {
                        let res = await loadValueByLogin('workout_plan', workoutPlanID, router.query.login)
                        if (res.data) {
                            setUser(res.user)
                            setData(
                                loadMissingData({
                                    _id: 'XD' + new Date().getTime(),
                                    user_ID: res.user._id,
                                    object: res.data
                                })
                            )
                        } else {
                            router.push(`/${router.query.login}/workout-plans`)
                        }
                    } else {
                        router.push(`/${router.query.login}/workout-plans`)
                    }
                }
            }
        })()
    }, [workoutPlanID, reload, router.query, reloadKey])

    return { data, user, reload: () => setReload(reload + 1) }
}

export default useWorkoutPlan;