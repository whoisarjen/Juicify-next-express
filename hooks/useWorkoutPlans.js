import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllIndexedDB } from "../utils/indexedDB";
import { loadValueByLogin } from '../utils/API'

const useWorkoutPlans = () => {
    const router = useRouter()
    const [data, setData] = useState(false)
    const [user, setUser] = useState({})
    const token = useSelector(state => state.token.value)

    useEffect(async () => {
        if (token) {
            if (token.login == router.query.login) {
                setData(await getAllIndexedDB('workout_plan'))
                setUser(token)
            } else {
                const response = await loadValueByLogin('workout_plans', router.query.login)
                setData(response.data || {})
                setUser(response.user || [])
            }
        }
    }, [token])

    return { data, user };
}

export default useWorkoutPlans;