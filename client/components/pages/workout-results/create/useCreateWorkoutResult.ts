import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import useWorkoutPlans from "../../workout-plans/useGetWorkoutPlans"
import { WorkoutPlanSchemaProps } from "../../../../schema/workoutPlan.schema"
import { getShortDate } from "../../../../utils/date.utils"
import { addIndexedDB } from "../../../../utils/indexedDB.utils"

const useCreateWorkoutResult = () => {
    const { t } = useTranslation('workout')
    const router = useRouter()
    const { data } = useWorkoutPlans()
    const [open, setOpen] = useState(false)
    const [whenAdded, setWhenAdded] = useState(new Date(getShortDate()))
    const [workoutPlanID, setWorkoutPlanID] = useState('')

    const createWorkoutResult = async () => {
        if (data && data.length) {
            const workoutPlan: WorkoutPlanSchemaProps[] = data.filter((workout: WorkoutPlanSchemaProps) => workout._id === workoutPlanID)
            const createdID = 'XD' + new Date().getTime()
            let whenAddedChanged = new Date(whenAdded).toJSON().slice(0, 10)
            await addIndexedDB(
                'workout_result',
                [{
                    ...(({ exercises, ...o }) => o)(workoutPlan[0]),
                    ...{
                        description: '',
                        whenAdded: whenAddedChanged,
                        workout_plan_ID: workoutPlan[0]._id,
                        _id: createdID,
                        results: workoutPlan[0]?.exercises ? workoutPlan[0].exercises.map((exercise: any) => {
                            return {
                                ...exercise,
                                values: []
                            }
                        })
                            :
                            []
                    }
                }]
            )
            router.push(`/${router.query.login}/workout/results/${whenAddedChanged}/${createdID}`)
        }
    }

    useEffect(() => {
        if (data && data[0]?._id) {
            setWorkoutPlanID(data[0]._id || '')
        }
    }, [data])

    return { open, setOpen, data, setWhenAdded, workoutPlanID, setWorkoutPlanID, createWorkoutResult, t }
}

export type useCreateWorkoutResultprops = ReturnType<typeof useCreateWorkoutResult>

export default useCreateWorkoutResult;