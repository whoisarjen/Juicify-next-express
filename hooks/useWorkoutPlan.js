import { useState, useEffect } from 'react'
import { getIndexedDBbyID } from '../utils/indexedDB'

const useWorkoutPlan = (workoutPlanID) => {
    const [data, setData] = useState(false)
    const [reload, setReload] = useState(0)

    useEffect(async () => {
        if (workoutPlanID) {
            setData(await getIndexedDBbyID('workout_plan', workoutPlanID))
        }
    }, [workoutPlanID, reload])

    return [data, () => setReload(reload + 1)]
}

export default useWorkoutPlan;