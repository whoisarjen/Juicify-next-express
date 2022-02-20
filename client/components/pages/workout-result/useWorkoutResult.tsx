import { zodResolver } from "@hookform/resolvers/zod"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { useAppSelector } from "../../../hooks/useRedux"
import { ExerciseSchemaProps } from "../../../schema/exercise.schema"
import { WorkoutResultSchemaProps, ValueSchemaProps, ResultSchemaProps, WorkoutResultSchema } from "../../../schema/workoutResult.schema"
import { is_id, overwriteThoseIDSinDB, insertThoseIDStoDB, insertThoseIDStoDBController } from "../../../utils/db.utils"
import { deleteIndexedDB, addIndexedDB } from "../../../utils/indexedDB.utils"
import {  prepareWorkoutResultToSend } from "../../../utils/workoutResult.utils"
import useGetWorkoutResult from "./useGetWorkoutResult"

const useWorkoutResult = () => {
    const router: any = useRouter()
    const { t } = useTranslation('workout')
    const { data, user, daily } = useGetWorkoutResult()
    console.log(data)
    const token: any = useAppSelector(state => state.token.value)
    const [isLoading, setIsLoading] = useState(false)
    const isDateSupported = useAppSelector(state => state.config.theOldestSupportedDate()) <= router.query.date

    const deleteEverything = async () => {
        setIsLoading(true)
        if (await is_id(router.query.id)) {
            let newDaily = daily
            newDaily.workout_result = newDaily.workout_result.filter((result: WorkoutResultSchemaProps) => result._id != router.query.id)
            if (daily._id && await is_id(daily._id)) {
                await overwriteThoseIDSinDB('daily_measurement', [newDaily])
            } else {
                await insertThoseIDStoDB('daily_measurement', [newDaily])
            }
        }
        await deleteIndexedDB('workout_result', router.query.id)
        router.push(`/${router.query?.login}/workout/results`)
        setIsLoading(false)
    }

    const autoSave = async () => {
        if (isDateSupported) {
            await deleteIndexedDB('workout_result', getValues()._id as string)
            await addIndexedDB('workout_result', [{ ...getValues(), whenAdded: router.query.date }])
        }
    }

    const addExercises = async (array: Array<ExerciseSchemaProps>) => {
        array.forEach((exercise: ExerciseSchemaProps) => {
            append({
                ...(exercise._id && { _id: exercise._id }),
                ...(exercise.name && { name: exercise.name }),
                values: []
            })
        })
    }

    const updateResults = async ({ values, result, index }: { values: Array<ValueSchemaProps>, result: ResultSchemaProps, index: number }) => {
        update(index, { ...result, values })
    }

    const { register, formState: { errors, isDirty }, handleSubmit, control, reset, getValues } = useForm<WorkoutResultSchemaProps>({
        resolver: zodResolver(WorkoutResultSchema)
    })

    const { fields, append, remove, update } = useFieldArray({ control, name: "results", })

    const onSubmit = async (values: WorkoutResultSchemaProps) => {
        try {
            setIsLoading(true)
            let newDaily = daily
            newDaily.workout_result = newDaily.workout_result.filter((result: any) => result._id != router.query.id)
            newDaily.workout_result.push(prepareWorkoutResultToSend(values))
            if (!await is_id(router.query.id) && values.burnt) {
                newDaily.nutrition_diary.push({
                    _id: 'XD' + new Date().getTime(),
                    activity: values.title,
                    calories: -1 * parseInt(values.burnt.toString())
                })
            }
            await insertThoseIDStoDBController('daily_measurement', [newDaily])
            await deleteIndexedDB('workout_result', router.query.id)
            router.push(`/${router.query?.login}/workout/results`)
        } catch (e: any) {
            console.log(e.message)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        (async () => {
            if (isDirty) {
                await autoSave()
            }
        })()
    }, [isDirty])

    useEffect(() => reset(data), [data])

    return { t, isLoading, handleSubmit, onSubmit, deleteEverything, errors, router, getValues, register, fields, addExercises, remove, token, user, updateResults }
}

export type useWorkoutResultProps = ReturnType<typeof useWorkoutResult>

export default useWorkoutResult;