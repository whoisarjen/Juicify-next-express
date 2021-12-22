import useWorkoutResult from '../../../../hooks/useWorkoutResult'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { addIndexedDB, deleteIndexedDB, getIndexedDBbyID } from '../../../../utils/indexedDB';
import AddResultValues from '../../../../components/workout/AddResultValues';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Navbar from '../../../../components/workout/Navbar'
import ConfirmDialog from '../../../../components/common/ConfirmDialog';
import { insertThoseIDStoDB, is_id, overwriteThoseIDSinDB } from '../../../../utils/API';
import { ToastContainer, toast } from 'react-toastify'

const WorkoutResultsID = () => {
    const router = useRouter()
    const [date, setDate] = useState('')
    const [{ data, user, daily }] = useWorkoutResult()
    const [burnt, setBurnt] = useState(0)
    const [title, setTitle] = useState('')
    const [results, setResults] = useState([])
    const [isOwner, setIsOwner] = useState(false)
    const [isDialog, setIsDialog] = useState(false)
    const [description, setDescription] = useState('')
    const token = useSelector(state => state.token.value)
    const [saveLoading, setSaveLoading] = useState(false)
    const [autoSaveCheck, setAutoSaveCheck] = useState(false)
    const [descriptionWorkout, setDescriptionWorkout] = useState('')
    const theOldestSupportedDate = useSelector(state => state.config.theOldestSupportedDate())

    const deleteWorkoutResult = async () => {
        if (await is_id(router.query.id)) {
            let newDaily = daily
            newDaily.workout_result = newDaily.workout_result.filter(result => result._id != router.query.id)
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
        for (let i = 0; i < results.length; i++) {
            count += results[i].values.length
            if (count > 0) {
                break;
            }
        }
        if (count > 0) {
            let newDaily = daily
            newDaily.workout_result.filter(result => result._id != router.query.id)
            let object = {
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
            toast.error("Add some results!", {
                position: "bottom-right",
                autoClose: 2000,
                closeOnClick: true,
            })
        }
        setSaveLoading(false)
    }

    const autoSave = async (newResults) => {
        if (theOldestSupportedDate <= router.query.date) {
            let object = data
            if (newResults) {
                object.results = newResults
            } else {
                object.results = results
            }
            object.burnt = burnt
            object.description = description
            await deleteIndexedDB('workout_result', object._id)
            await addIndexedDB('workout_result', [object])
        }
    }

    const setNewValues = async (values, index) => {
        let newResults = results
        newResults[index] = {
            ...newResults[index],
            values
        }
        setResults(newResults)
        await autoSave(newResults)
    }

    useEffect(async () => {
        if (autoSaveCheck) {
            await autoSave()
        }
    }, [burnt, description, results])

    useEffect(async () => {
        if (data) {
            setTitle(data.title || '')
            setBurnt(data.burnt || 0)
            setDate(data.whenAdded || '')
            setDescription(data.description || '')
            setResults(data.results || [])
            setDescriptionWorkout(await getIndexedDBbyID('workout_plan', data.workout_plan_ID).description)
            setAutoSaveCheck(true)
        }
    }, [data])

    useEffect(() => {
        if (token && token.login == router.query.login) {
            setIsOwner(true)
        } else {
            setIsOwner(false)
        }
    }, [token])

    return (
        <div className="workoutResultsID">
            <ToastContainer />
            <Navbar
                title="Workout result"
                where="workout-results"
                saveLoading={saveLoading}
                saveWorkout={saveWorkoutResult}
                setIsDialog={(Boolean) => setIsDialog(Boolean)}
            />
            <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                sx={{ width: '100%', marginTop: '10px' }}
                disabled
                value={title}
            />
            <TextField
                id="outlined-basic"
                label="Date"
                variant="outlined"
                sx={{ width: '100%', marginTop: '10px' }}
                disabled
                value={date}
            />
            {
                descriptionWorkout &&
                <TextField
                    id="outlined-basic"
                    label="Description of workout plan"
                    variant="outlined"
                    sx={{ width: '100%', marginTop: '10px' }}
                    disabled
                    value={descriptionWorkout}
                />
            }
            <TextField
                id="outlined-basic"
                label="Burnt"
                variant="outlined"
                sx={{ width: '100%', marginTop: '10px' }}
                value={burnt}
                onChange={e => setBurnt(e.target.value)}
                disabled={!isOwner}
                InputProps={{
                    endAdornment: <InputAdornment position="end">Kcal</InputAdornment>,
                }}
            />
            <TextField
                multiline
                rows={4}
                id="outlined-basic"
                label="Notes"
                variant="outlined"
                value={description}
                disabled={!isOwner}
                onChange={e => setDescription(e.target.value)}
                sx={{ width: '100%', marginTop: '10px' }}
            />
            {
                results && results.map((result, index) =>
                    <AddResultValues
                        key={result._id}
                        result={result}
                        isOwner={isOwner}
                        setNewValues={(values) => setNewValues(values, index)}
                    />
                )
            }
            {
                isOwner &&
                <ConfirmDialog
                    isDialog={isDialog}
                    confirm={deleteWorkoutResult}
                    closeDialog={() => setIsDialog(false)}
                />
            }
        </div>
    );
}

export default WorkoutResultsID;