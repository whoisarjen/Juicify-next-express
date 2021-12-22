import { is_id } from '../utils/API'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { useState, useEffect } from 'react'
import { readToken } from '../utils/checkAuth'
import { loadValueByLogin } from '../utils/API'
import { getIndexedDBbyID } from '../utils/indexedDB'

const useWorkoutPlan = (workoutPlanID) => {
    const router = useRouter()
    const [cookies] = useCookies()
    const [user, setUser] = useState({})
    const [reload, setReload] = useState(0)
    const [data, setData] = useState(false)

    useEffect(async () => {
        if (workoutPlanID) {
            const token = readToken(cookies.token)
            if (token.login == router.query.login) {
                let object = await getIndexedDBbyID('workout_plan', workoutPlanID)
                if (object) {
                    if (!object.title) object.title = ''
                    if (!object.description) object.description = ''
                    if (!object.burnt) object.burnt = 0
                    if (!object.exercises) object.exercises = []
                    setUser(token)
                    setData(object)
                } else {
                    router.push(`/${router.query.login}/workout-plans`)
                }
            } else {
                if (await is_id(router.query.id)) {
                    let res = await loadValueByLogin('workout_plan', workoutPlanID, router.query.login)
                    if (res.data) {
                        if (!res.data.title) res.data.title = ''
                        if (!res.data.description) res.data.description = ''
                        if (!res.data.burnt) res.data.burnt = 0
                        if (!res.data.exercises) res.data.exercises = []
                        setUser(res.user)
                        setData(res.data)
                    } else {
                        router.push(`/${router.query.login}/workout-plans`)
                    }
                } else {
                    router.push(`/${router.query.login}/workout-plans`)
                }
            }
        }
    }, [workoutPlanID, reload])

    return [{ data, user }, () => setReload(reload + 1)]
}

export default useWorkoutPlan;