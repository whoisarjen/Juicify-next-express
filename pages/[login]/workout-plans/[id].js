import useWorkoutPlan from "../../../hooks/useWorkoutPlan";
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AddExercises from '../../../components/workout/AddExercises'
import { useSelector } from 'react-redux'
import { addIndexedDB, deleteIndexedDB } from "../../../utils/indexedDB";

const WorkoutPlansID = () => {
    const router = useRouter()
    const [data, reloadWorkoutPlan] = useWorkoutPlan(router.query.id)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [burnt, setBurnt] = useState(0)
    const [exercises, setExercises] = useState([])
    const [isAddDialog, setIsAddDialog] = useState(false)
    const token = useSelector(state => state.token.value)

    useEffect(() => {
        setName(data.name)
        setDescription(data.description)
        setBurnt(data.burnt)
        setExercises(data.exercises)
    }, [data])

    const save = async (auto) => {
        let object = {
            _id: router.query.id,
            name: name,
            user_ID: token._id,
            description: description,
            burnt: burnt,
            exercises: exercises,
            notSaved: new Date().getTime()
        }
        if (!auto) {
            delete object.notSaved
        }
        if (!object.burnt) {
            delete object.burnt
        }
        if (!object.exercises || object.exercises.length > 0) {
            delete object.exercises
        }
        if (!object.description) {
            delete object.description
        }
        await deleteIndexedDB('workout_plan', router.query.id)
        await addIndexedDB('workout_plan', [object])
    }

    const handleDelete = async () => {

    }

    return (
        <div className="workoutPlansID">
            <TextField
                id="outlined-basic"
                label="Name of plan"
                variant="outlined"
                value={name}
                type="text"
                onChange={(e) => {
                    setName(e.target.event)
                    save(true)
                }}
                sx={{ width: '100%', marginTop: '10px' }}
            />
            <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                value={description}
                type="text"
                onChange={(e) => {
                    setDescription(e.target.event)
                    save(true)
                }}
                sx={{ width: '100%', marginTop: '10px' }}
            />
            <TextField
                id="outlined-basic"
                label="Burnt calories"
                variant="outlined"
                value={burnt}
                type="number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                onChange={(e) => {
                    setBurnt(e.target.event)
                    save(true)
                }}
                sx={{ width: '100%', marginTop: '10px', display: 'grid', gridTemplateColumns: 'auto 1fr auro' }}
            />
            <Stack direction="column" spacing={1}>
                {
                    exercises && exercises.map(exercise =>
                        <Chip
                            key={exercise._id}
                            label={exercise.name}
                            onDelete={handleDelete}
                            avatar={<SwapVertIcon />}
                            deleteIcon={<DeleteIcon />}
                            sx={{
                                width: '100%',
                                display: 'grid',
                                gridTemplateColumns: 'auto 1fr auto',
                                padding: '0 5px',
                                height: '44px',
                                marginTop: '10px'
                            }}
                        />
                    )
                }
            </Stack>
            <button onClick={() => setIsAddDialog(true)}>Dodaj</button>
            {
                token && token.login == router.query.login &&
                <AddExercises
                    isAddDialog={isAddDialog}
                    skipThoseIDS={exercises}
                    closeDialog={() => setIsAddDialog(false)}
                    reload={reloadWorkoutPlan}
                />
            }
        </div>
    );
}

export default WorkoutPlansID;