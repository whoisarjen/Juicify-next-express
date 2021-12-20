import { useState, useEffect } from 'react'
import { getIndexedDBbyID } from '../utils/indexedDB'

const useWorkoutPlan = (workoutPlanID) => {
    const [data, setData] = useState(false)
    const [reload, setReload] = useState(0)

    useEffect(async () => {
        if (workoutPlanID) {
            let object = await getIndexedDBbyID('workout_plan', workoutPlanID)
            if (object) {
                if (!object.title) object.title = ''
                if (!object.description) object.description = ''
                if (!object.burnt) object.burnt = 0
                if (!object.exercises) object.exercises = []
            }
            setData(object)
        }
    }, [workoutPlanID, reload])

    return [data, () => setReload(reload + 1)]
}

export default useWorkoutPlan;