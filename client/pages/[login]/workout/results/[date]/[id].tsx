import useWorkoutResult from '../../../../../hooks/useWorkoutResult'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { addIndexedDB, deleteIndexedDB } from '../../../../../utils/indexedDB.utils';
import ResultBox from '../../../../../components/workout/results/ResultBox';
import { useAppSelector } from '../../../../../hooks/useRedux';
import { useRouter } from 'next/router';
import Navbar from '../../../../../components/workout/Navbar'
import ConfirmDialog from '../../../../../components/common/ConfirmDialog';
import { insertThoseIDStoDB, insertThoseIDStoDBController, is_id, overwriteThoseIDSinDB } from '../../../../../utils/db.utils';
import useTranslation from "next-translate/useTranslation";
import AddResultMoreOptions from '../../../../../components/workout/results/MoreOptionsButton'
import BottomFlyingGuestBanner from '../../../../../components/common/BottomFlyingGuestBanner'
import { ExerciseSchemaProps } from '../../../../../schema/exercise.schema';
import { ResultSchemaProps, ValueSchemaProps, WorkoutResultSchema, WorkoutResultSchemaProps } from '../../../../../schema/workoutResult.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { prepareWorkoutResultToSend } from '../../../../../utils/workoutResult.utils';
import { reverseDateDotes } from '../../../../../utils/date.utils';

const WorkoutResults = () => {
    const router: any = useRouter()
    const { t } = useTranslation('workout')
    const [{ data, user, daily }] = useWorkoutResult()
    const token: any = useAppSelector(state => state.token.value)
    const [saveLoading, setSaveLoading] = useState(false)
    const [deleteExerciseIndex, setDeleteExerciseIndex] = useState<number | boolean>(false)
    const isDateSupported = useAppSelector(state => state.config.theOldestSupportedDate()) <= router.query.date

    const deleteEverything = async () => {
        setSaveLoading(true)
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
        setSaveLoading(false)
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

    const deleteExercise = async (index: number) => {
        remove(index as number)
        setDeleteExerciseIndex(false)
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
            setSaveLoading(true)
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
            setSaveLoading(false);
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

    return (
        <form>
            <Navbar
                title="Workout result"
                where="workout/results"
                saveLoading={saveLoading}
                saveWorkout={handleSubmit(onSubmit)}
                deleteWorkout={deleteEverything}
            />
            <TextField
                variant="outlined"
                label={t("Title")}
                type="text"
                sx={{ width: '100%', marginTop: '10px' }}
                disabled
                defaultValue={' '}
                {...register('title')}
                error={typeof errors.title === 'undefined' ? false : true}
                helperText={
                    errors.title?.message &&
                    errors.title?.message.length &&
                    errors.title?.message
                }
            />
            <TextField
                variant="outlined"
                label={t("Date")}
                type="text"
                sx={{ width: '100%', marginTop: '10px' }}
                disabled
                defaultValue={reverseDateDotes(router.query.date)}
            />
            {
                getValues()?.workout_description &&
                <TextField
                    disabled
                    variant="outlined"
                    label={t("Description of workout plan")}
                    type="text"
                    sx={{ width: '100%', marginTop: '10px' }}
                    defaultValue={' '}
                    {...register('workout_description')}
                    error={typeof errors.workout_description === 'undefined' ? false : true}
                    helperText={
                        errors.workout_description?.message &&
                        errors.workout_description?.message.length &&
                        errors.workout_description?.message
                    }
                />
            }
            {
                !(async () => await is_id(router.query.id)) &&
                <TextField
                    variant="outlined"
                    label={t("Burnt")}
                    type="text"
                    disabled
                    sx={{ width: '100%', marginTop: '10px' }}
                    defaultValue={' '}
                    {...register('burnt')}
                    error={typeof errors.burnt === 'undefined' ? false : true}
                    helperText={
                        errors.burnt?.message &&
                        errors.burnt?.message.length &&
                        errors.burnt?.message
                    }
                />
            }
            <TextField
                variant="outlined"
                label={t("Notes")}
                type="text"
                sx={{ width: '100%', marginTop: '10px' }}
                multiline
                rows={4}
                defaultValue={' '}
                {...register('description')}
                error={typeof errors.description === 'undefined' ? false : true}
                helperText={
                    errors.description?.message &&
                    errors.description?.message.length &&
                    errors.description?.message
                }
            />
            {
                fields.map((result: ResultSchemaProps, index: number) =>
                    <div style={fields.length == (index + 1) ? { marginBottom: '100px' } : {}} key={(result._id || '') + index}>
                        <ResultBox
                            key={(result._id || '') + index}
                            result={result}
                            isOwner={token?.login == router.query?.login}
                            setNewValues={(values: Array<ValueSchemaProps>) => updateResults({ values, result, index })}
                            openDeleteExercise={() => setDeleteExerciseIndex(index)}
                        />
                    </div>
                )
            }
            {
                token?.login == router.query?.login
                    ?
                    <>
                        <ConfirmDialog
                            isDialog={deleteExerciseIndex !== false ? true : false}
                            closeDialog={() => setDeleteExerciseIndex(false)}
                            confirm={() => deleteExercise(deleteExerciseIndex as number)}
                        />
                        <AddResultMoreOptions
                            exercises={[...fields.map((x: any) => {
                                x.l = x.name.length
                                return x
                            })]}
                            setExercises={addExercises}
                        />
                    </>
                    :
                    <BottomFlyingGuestBanner user={user} />
            }
        </form>
    );
}

export default WorkoutResults;