import { is_id } from '../utils/API'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { loadValueByLogin } from '../utils/API'
import { getIndexedDBbyID } from '../utils/indexedDB.utils'
import WorkoutPlanProps from '../interfaces/workout/workoutPlan'
import { useAppSelector } from './useRedux'

const useWorkoutPlan = (workoutPlanID: string): [any, () => void] => {
    const router: any = useRouter()
    const [user, setUser] = useState({})
    const [reload, setReload] = useState(0)
    const [data, setData] = useState<boolean | WorkoutPlanProps>(false)
    const token: any = useAppSelector(state => state.token.value)
    const reloadKey = useAppSelector(state => state.key.workout_plan)

    useEffect(() => {
        (async () => {
            if (workoutPlanID) {
                if (token.login == router.query.login) {
                    const workoutPlan: WorkoutPlanProps = await getIndexedDBbyID('workout_plan', workoutPlanID)
                    if (workoutPlan) {
                        setUser(token)
                        setData({ ...workoutPlan })
                    } else {
                        router.push(`/${router.query.login}/workout-plans`)
                    }
                } else {
                    if (await is_id(router.query.id)) {
                        let res = await loadValueByLogin('workout_plan', workoutPlanID, router.query.login)
                        if (res.data) {
                            setUser(res.user)
                            setData({ ...res.data })
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

    return [{ data, user }, () => setReload(reload + 1)]
}

export default useWorkoutPlan;