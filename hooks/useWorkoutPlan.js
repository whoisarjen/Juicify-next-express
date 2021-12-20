import { useState, useEffect } from 'react'
import { readToken } from "../utils/checkAuth"
import { getIndexedDBbyID } from '../utils/indexedDB'
import { loadOneValueByLogin } from '../utils/API'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

const useWorkoutPlan = (workoutPlanID) => {
    const router = useRouter()
    const [cookies] = useCookies()
    const [reload, setReload] = useState(0)
    const [data, setData] = useState(false)
    const [user, setUser] = useState({})

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
                let res = await loadOneValueByLogin('workout_plan', workoutPlanID, router.query.login)
                if (res.data) {
                    if (!res.data.title) res.data.title = ''
                    if (!res.data.description) res.data.description = ''
                    if (!res.data.burnt) res.data.burnt = 0
                    if (!res.data.exercises) res.data.exercises = []
                    console.log(res.data)
                    setUser(res.user)
                    setData(res.data)
                } else {
                    router.push(`/${router.query.login}/workout-plans`)
                }
            }
        }
    }, [workoutPlanID, reload])

    return [{ data, user }, () => setReload(reload + 1)]
}

export default useWorkoutPlan;