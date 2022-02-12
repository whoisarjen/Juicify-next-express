import useWorkoutResult from '../../../../hooks/useWorkoutResult'
import { useState, useEffect, FunctionComponent } from 'react'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { addIndexedDB, deleteIndexedDB, getIndexedDBbyID } from '../../../../utils/indexedDB.utils';
import AddResultValues from '../../../../components/workout/AddResultValues';
import { useAppSelector } from '../../../../hooks/useRedux';
import { useRouter } from 'next/router';
import Navbar from '../../../../components/workout/Navbar'
import ConfirmDialog from '../../../../components/common/ConfirmDialog';
import { insertThoseIDStoDB, is_id, overwriteThoseIDSinDB } from '../../../../utils/db.utils';
import useTranslation from "next-translate/useTranslation";
import AddResultMoreOptions from '../../../../components/workout/AddResultMoreOptions'
import BottomFlyingGuestBanner from '../../../../components/common/BottomFlyingGuestBanner'
import { useNotify } from '../../../../hooks/useNotify';
import { ExerciseSchemaProps } from '../../../../schema/exercise.schema';
import { ResultSchemaProps, ValueSchemaProps, WorkoutResultSchemaProps } from '../../../../schema/workoutResult.schema';

const WorkoutResultsID: FunctionComponent = () => {
    const router: any = useRouter()
    const [trueID, setTrueID] = useState(false)
    const [date, setDate] = useState(new Date())
    const [burnt, setBurnt] = useState<any>(0)
    const [title, setTitle] = useState<any>('')
    const { t } = useTranslation('workout')
    const [results, setResults] = useState<Array<ResultSchemaProps>>([])
    const [description, setDescription] = useState<any>('')
    const [{ data, user, daily }] = useWorkoutResult()
    const token: any = useAppSelector(state => state.token.value)
    const [saveLoading, setSaveLoading] = useState(false)
    const [deleteExercises, setDeleteExercise] = useState<ResultSchemaProps | boolean>(false)
    const [descriptionWorkout, setDescriptionWorkout] = useState('')
    const theOldestSupportedDate = useAppSelector(state => state.config.theOldestSupportedDate())
    const basicInputLength = useAppSelector(state => state.config.basicInputLength)
    const [{ error }] = useNotify()

    const deleteWorkoutResult = async () => {
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
        router.push(`/${router.query.login}/workout-results`)
    }

    const saveWorkoutResult = async () => {
        setSaveLoading(true)
        let count = 0
        results.forEach((result: ResultSchemaProps) => {
            if (result.values) {
                count += result.values.length
            }
        })
        if (count > 0) {
            let newDaily = daily
            newDaily.workout_result = newDaily.workout_result.filter((result: any) => result._id != router.query.id)
            let object: any = {
                _id: router.query.id,
                title: data.title,
                workout_plan_ID: data.workout_plan_ID,
                results: results
            }
            if (description) {
                object.description = description
            }
            if (burnt) {
                object.burnt = burnt
            }
            if (await is_id(router.query.id)) {
                object._id = router.query.id
            } else {
                if (burnt) {
                    newDaily.nutrition_diary.push({
                        _id: 'XD' + new Date().getTime(),
                        activity: data.title,
                        calories: -1 * parseInt(burnt)
                    })
                }
            }
            newDaily.workout_result.push(object)
            if (daily._id && await is_id(daily._id)) {
                await overwriteThoseIDSinDB('daily_measurement', [newDaily])
            } else {
                await insertThoseIDStoDB('daily_measurement', [newDaily])
            }
            await deleteIndexedDB('workout_result', router.query.id)
            router.push(`/${router.query.login}/workout-results`)
        } else {
            error(t('Add some results'))
        }
        setSaveLoading(false)
    }

    const autoSave = async (value: any, where: string = '') => {
        if (theOldestSupportedDate <= router.query.date) {
            let object = { ...data }
            object[where] = value
            object.whenAdded = object.whenAdded.slice(6, 10) + '-' + object.whenAdded.slice(3, 5) + '-' + object.whenAdded.slice(0, 2)
            await deleteIndexedDB('workout_result', object._id)
            await addIndexedDB('workout_result', [object])
        }
    }

    const setNewValues = async (values: Array<ValueSchemaProps>, index: number) => {
        let newResults: Array<ResultSchemaProps> = results
        newResults[index].values = values
        setResults(newResults)
        await autoSave(newResults, 'results')
    }

    const handleDeleteExercise = async (array: any) => {
        const newResults: Array<ResultSchemaProps> = [
            ...results.filter((x: ResultSchemaProps) => x._id != array[0]._id)
        ]
        setResults(newResults)
        await autoSave(newResults, 'results')
        setDeleteExercise(false)
    }

    const handleNewExercises = async (array: Array<ExerciseSchemaProps>) => {
        const newResults = [
            ...results,
            ...array.map((exerciseLocally: ExerciseSchemaProps) => {
                return {
                    ...(exerciseLocally._id && { _id: exerciseLocally._id }),
                    ...(exerciseLocally.name && { name: exerciseLocally.name }),
                    values: []
                }
            })
        ]
        setResults(newResults)
        await autoSave(newResults, 'results')
    }

    useEffect(() => {
        (async () => {
            if (data) {
                if (await is_id(router.query.id)) {
                    setTrueID(true)
                }
                setTitle(data.title || '')
                setBurnt(data.burnt || 0)
                setDate(data.whenAdded || '')
                setDescription(data.description || '')
                setResults(data.results || [])
                if (token && token.login == router.query.login) {
                    let newDescription = await getIndexedDBbyID('workout_plan', data.workout_plan_ID)
                    setDescriptionWorkout(newDescription.description)
                }
            }
        })()
    }, [data, user, daily, token])

    return (
        <div className="workoutResultsID">
            <Navbar
                title="Workout result"
                where="workout-results"
                saveLoading={saveLoading}
                saveWorkout={saveWorkoutResult}
                deleteWorkout={deleteWorkoutResult}
            />
            <TextField
                id="outlined-basic"
                label={t("Title")}
                variant="outlined"
                sx={{ width: '100%', marginTop: '10px' }}
                disabled
                value={title}
            />
            <TextField
                id="outlined-basic"
                label={t("Date")}
                variant="outlined"
                sx={{ width: '100%', marginTop: '10px' }}
                disabled
                value={date}
            />
            {
                descriptionWorkout &&
                <TextField
                    id="outlined-basic"
                    label={t("Description of workout plan")}
                    variant="outlined"
                    sx={{ width: '100%', marginTop: '10px' }}
                    disabled
                    value={descriptionWorkout}
                />
            }
            {
                !trueID &&
                <TextField
                    id="outlined-basic"
                    label={t("Burnt")}
                    variant="outlined"
                    sx={{ width: '100%', marginTop: '10px' }}
                    value={burnt}
                    onChange={async e => {
                        setBurnt(e.target.value)
                        await autoSave(e.target.value, 'burnt')
                    }
                    }
                    disabled={token.login != router.query.login}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">Kcal</InputAdornment>,
                    }}
                />
            }
            <TextField
                multiline
                rows={4}
                id="outlined-basic"
                label={t("Notes")}
                variant="outlined"
                value={description}
                disabled={token.login != router.query.login}
                onChange={async e => {
                    setDescription(e.target.value)
                    await autoSave(e.target.value, 'notes')
                }
                }
                sx={{ width: '100%', marginTop: '10px' }}
                error={
                    description.length > 0 && !basicInputLength(description)
                }
                helperText={
                    description.length > 0 && !basicInputLength(description)
                        ? t("home:requiredBasicInputLength")
                        : ""
                }
            />
            {
                results && results.map((result: ResultSchemaProps, index: number) =>
                    <div style={results.length == (index + 1) ? { marginBottom: '100px' } : {}} key={(result._id || '') + index}>
                        <AddResultValues
                            key={(result._id || '') + index}
                            result={result}
                            isOwner={token.login == router.query.login}
                            setNewValues={(values: Array<ValueSchemaProps>) => setNewValues(values, index)}
                            openDeleteExercise={() => setDeleteExercise(result)}
                        />
                    </div>
                )
            }
            {
                token.login == router.query.login ?
                    (
                        <>
                            <ConfirmDialog isDialog={deleteExercises ? true : false} closeDialog={() => setDeleteExercise(false)} confirm={() => handleDeleteExercise([deleteExercises])} />
                            <AddResultMoreOptions
                                exercises={[...results.map((x: any) => {
                                    x.l = x.name.length
                                    return x
                                })]}
                                setExercises={handleNewExercises}
                            />
                        </>
                    ) : (
                        <BottomFlyingGuestBanner user={user} />
                    )
            }
        </div>
    );
}

export default WorkoutResultsID;