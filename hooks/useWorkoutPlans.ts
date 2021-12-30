import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getAllIndexedDB } from "../utils/indexedDB";
import { loadValueByLogin } from '../utils/API'
import { readToken } from "../utils/checkAuth";
import { useCookies } from "react-cookie";

const useWorkoutPlans = (): any => {
    const router: any = useRouter()
    const [data, setData] = useState(false)
    const [user, setUser] = useState({})
    const [cookies] = useCookies()

    useEffect(() => {
        (async () => {
            const token = readToken(cookies.token)
            if (token.login == router.query.login) {
                setData(await getAllIndexedDB('workout_plan'))
                setUser(token)
            } else {
                const response = await loadValueByLogin('workout_plans', router.query.login)
                setData(response.data || {})
                setUser(response.user || [])
            }
        })()
    }, [cookies, router.query])

    return { data, user };
}

export default useWorkoutPlans;