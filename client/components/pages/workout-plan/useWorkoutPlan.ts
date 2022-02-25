import { zodResolver } from "@hookform/resolvers/zod"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { useAppSelector } from "../../../hooks/useRedux"
import { WorkoutPlanSchemaProps, WorkoutPlanSchema } from "../../../schema/workoutPlan.schema"
import { is_id, deleteThoseIDSfromDB, insertThoseIDStoDBController } from "../../../utils/db.utils"
import { deleteIndexedDB } from "../../../utils/indexedDB.utils"
import useGetWorkoutPlan from "../../../hooks/useGetWorkoutPlan"

const useWorkoutPlan = () => {
    const router: any = useRouter()
    const { t } = useTranslation('workout')
    const [isLoading, setIsLoading] = useState(false)
    const token: any = useAppSelector(state => state.token.value)
    const { data, user } = useGetWorkoutPlan(router.query.id)

    const deleteWorkoutPlan = async () => {
        try {
            setIsLoading(true)
            if (!await is_id(router.query.id)) {
                await deleteIndexedDB('workout_plan', router.query.id)
            } else {
                await deleteThoseIDSfromDB('workout_plan', [{ _id: router.query.id }])
            }
            router.push(`/${token.login}/workout/plans`)
        } finally {
            setIsLoading(false)
        }
    }

    const { register, formState: { errors }, handleSubmit, control, reset } = useForm<WorkoutPlanSchemaProps>({
        resolver: zodResolver(WorkoutPlanSchema)
    })

    const { fields, append, remove, move } = useFieldArray({ control, name: "exercises", })

    const saveWorkoutPlan = async (values: WorkoutPlanSchemaProps) => {
        try {
            setIsLoading(true)
            await insertThoseIDStoDBController('workout_plan', [{
                _id: router.query.id,
                ...(values.title && values.title.trim() && { title: values.title.trim() }),
                ...(values.description && values.description.trim() && { description: values.description.trim() }),
                ...(values.burnt && { burnt: values.burnt }),
                ...(values.exercises && { exercises: values.exercises }),
            }])
            router.push(`/${token.login}/workout/plans/`)
        } catch (e: any) {
            console.log(e)
        } finally {
            setIsLoading(false);
        }
    }

    const handleOnDragEnd = async (result: any) => {
        if (!result.destination) return
        move(result.source.index, result.destination.index)
    }

    useEffect(() => reset(data), [data])

    return { t, user, token, errors, fields, append, remove, handleOnDragEnd, register, deleteWorkoutPlan, handleSubmit, saveWorkoutPlan, isLoading }
}

export type useWorkoutPlanProps = ReturnType<typeof useWorkoutPlan>

export default useWorkoutPlan;