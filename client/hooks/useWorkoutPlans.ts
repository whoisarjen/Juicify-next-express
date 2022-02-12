import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getAllIndexedDB } from "../utils/indexedDB.utils";
import useOtherUser from "./useOtherUser";
import { useAppSelector } from "./useRedux";

const useWorkoutPlans = (): any => {
    const router: any = useRouter()
    const [data, setData] = useState(false)
    const [user, setUser] = useState({})
    const token: any = useAppSelector(state => state.token.value)
    const reloadKey = useAppSelector(state => state.key.workout_plan)
    const { loadValueByLogin } = useOtherUser()

    useEffect(() => {
        (async () => {
            if (token.login == router.query.login) {
                setData(await getAllIndexedDB('workout_plan'))
                setUser(token)
            } else {
                const response = await loadValueByLogin('workout_plans', router.query.login)
                setData(response.data || {})
                setUser(response.user || [])
            }
        })()
    }, [router.query, reloadKey])

    return { data, user };
}

export default useWorkoutPlans;