import useWorkoutResult from '../../../../hooks/useWorkoutResult'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { addIndexedDB, deleteIndexedDB, getIndexedDBbyID } from '../../../../utils/indexedDB';
import AddResultValues from '../../../../components/workout/AddResultValues';

const WorkoutResultsID = () => {
    const [date, setDate] = useState('')
    const [{ data }] = useWorkoutResult()
    const [burnt, setBurnt] = useState(0)
    const [title, setTitle] = useState('')
    const [results, setResults] = useState([])
    const [autoSave, setAutoSave] = useState(false)
    const [description, setDescription] = useState('')
    const [descriptionWorkout, setDescriptionWorkout] = useState('')

    const save = async (newResults) => {
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

    const setNewValues = async (values, index) => {
        let newResults = results
        newResults[index] = {
            ...newResults[index],
            values
        }
        setResults(newResults)
        await save(newResults)
    }

    useEffect(async () => {
        if (autoSave) {
            await save()
        }
    }, [burnt, description, results])

    useEffect(async () => {
        if (data) {
            setTitle(data.title)
            setBurnt(data.burnt)
            setDate(data.whenAdded)
            setDescription(data.description)
            setResults(data.results)
            setDescriptionWorkout(await getIndexedDBbyID('workout_plan', data.workout_plan_ID).description)
            setAutoSave(true)
        }
    }, [data])

    return (
        <div className="workoutResultsID">
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
                onChange={e => setDescription(e.target.value)}
                sx={{ width: '100%', marginTop: '10px' }}
            />
            {
                results && results.map((result, index) =>
                    <AddResultValues
                        key={result._id}
                        result={result}
                        setNewValues={(values) => setNewValues(values, index)}
                    />
                )
            }
        </div>
    );
}

export default WorkoutResultsID;