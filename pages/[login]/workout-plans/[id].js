import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { useRouter } from "next/router"
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react"
import TextField from '@mui/material/TextField'
import DeleteIcon from '@mui/icons-material/Delete'
import { ToastContainer, toast } from 'react-toastify'
import Navbar from '../../../components/workout/Navbar'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import useWorkoutPlan from "../../../hooks/useWorkoutPlan"
import useTranslation from "next-translate/useTranslation"
import ButtonPlus from '../../../components/common/ButtonPlus'
import AddExercises from '../../../components/workout/AddExercises'
import ConfirmDialog from '../../../components/common/ConfirmDialog'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { addIndexedDB, deleteIndexedDB, getIndexedDBbyID } from "../../../utils/indexedDB"
import { insertThoseIDStoDB, is_id, overwriteThoseIDSinDB, deleteThoseIDSfromDB } from "../../../utils/API"

const WorkoutPlansID = () => {
    const router = useRouter()
    const [burnt, setBurnt] = useState(0)
    const [title, setTitle] = useState("")
    const { t } = useTranslation('workout')
    const [exercises, setExercises] = useState([])
    const [description, setDescription] = useState("")
    const [isAddDialog, setIsAddDialog] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)
    const token = useSelector(state => state.token.value)
    const isOwner = token && token.login == router.query.login
    const [{ data }] = useWorkoutPlan(router.query.id)
    const [isDialog, setIsDialog] = useState(false)
    const basicInputLength = useSelector(state => state.config.basicInputLength)
    const requiredBasicInputLength = useSelector(state => state.config.requiredBasicInputLength)

    const saveWorkoutPlan = async () => {
        setSaveLoading(true)
        let object = await save(true)
        if (!requiredBasicInputLength(title)) {
            toast.error(t('Title is incorrect'), {
                position: "bottom-right",
                autoClose: 2000,
                closeOnClick: true,
            })
        } else if (!basicInputLength(description)) {
            toast.error(t('Description is incorrect'), {
                position: "bottom-right",
                autoClose: 2000,
                closeOnClick: true,
            })
        }else if (object.exercises.length < 1) {
            toast.error(t('Exercises are incorrect'), {
                position: "bottom-right",
                autoClose: 2000,
                closeOnClick: true,
            })
        } else {
            if (object._id) {
                await overwriteThoseIDSinDB('workout_plan', [object])
            } else {
                await insertThoseIDStoDB('workout_plan', [object])
            }
            router.push(`/${token.login}/workout-plans/`)
        }
        setSaveLoading(false)
    }

    const deleteWorkoutPlan = async () => {
        setSaveLoading(true)
        let object = await getIndexedDBbyID('workout_plan', router.query.id)
        if (!await is_id(object._id)) {
            await deleteIndexedDB('workout_plan', object._id)
        } else {
            await deleteThoseIDSfromDB('workout_plan', [object])
        }
        router.push(`/${token.login}/workout-plans`)
        setSaveLoading(false)
    }

    const save = async (prepareForDB) => {
        let object = {
            _id: router.query.id,
            title: title,
            user_ID: token._id,
            description: description,
            burnt: burnt,
            exercises: exercises
        }
        if (!object.burnt) {
            delete object.burnt
        }
        if (!object.description) {
            delete object.description
        }
        await deleteIndexedDB('workout_plan', router.query.id)
        if (!prepareForDB) {
            object.notSaved = new Date().getTime()
            await addIndexedDB('workout_plan', [object])
        } else if (!await is_id(object._id)) {
            delete object._id
        }
        return object
    }

    const handleOnDragEnd = async (result) => {
        if (!result.destination) return
        const newExercises = Array.from(exercises)
        const [reorderedExercises] = newExercises.splice(result.source.index, 1)
        newExercises.splice(result.destination.index, 0, reorderedExercises)
        setExercises(newExercises)
    }

    useEffect(() => {
        if (data) {
            setTitle(data.title)
            setDescription(data.description)
            setBurnt(data.burnt)
            setExercises(data.exercises)
        }
    }, [data])

    useEffect(async () => {
        if(!await is_id(router.query.id)){
            if (title != undefined && description != undefined && burnt != undefined && exercises != undefined) {
                if (isOwner) {
                    await save()
                }
            }
        }
    }, [title, description, burnt, exercises])

    return (
        <div className="workoutPlansID">
            <ToastContainer />
            <Navbar
                title="Workout plan"
                where="workout-plans"
                saveLoading={saveLoading}
                saveWorkout={saveWorkoutPlan}
                setIsDialog={(Boolean) => setIsDialog(Boolean)}
            />
            <TextField
                disabled={!isOwner}
                id="outlined-basic"
                label="Name of plan"
                variant="outlined"
                value={title}
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                sx={{ width: '100%', marginTop: '10px' }}
                error={
                    title.length > 0 && !requiredBasicInputLength(title)
                }
                helperText={
                    title.length > 0 && !requiredBasicInputLength(title)
                        ? t("home:requiredBasicInputLength")
                        : ""
                }
            />
            <TextField
                disabled={!isOwner}
                id="outlined-basic"
                label="Description"
                variant="outlined"
                value={description}
                type="text"
                onChange={(e) => setDescription(e.target.value)}
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
            <TextField
                disabled={!isOwner}
                id="outlined-basic"
                label="Burnt calories"
                variant="outlined"
                value={burnt}
                type="number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                onChange={(e) => setBurnt(e.target.value)}
                sx={{ width: '100%', marginTop: '10px', display: 'grid', gridTemplateColumns: 'auto 1fr auro' }}
            />
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="exercises">
                    {
                        (provided) => (
                            <Stack direction="column" spacing={1} {...provided.droppableProps} ref={provided.innerRef}>
                                {
                                    exercises && exercises.map((exercise, i) =>
                                        <Draggable key={exercise._id} draggableId={exercise._id} index={i}>
                                            {
                                                (provided) => (
                                                    <Chip
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                        disabled={!isOwner}
                                                        label={`${i + 1}. ${exercise.name}`}
                                                        onDelete={() => setExercises(exercises.filter(x => x._id != exercise._id))}
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
                                        </Draggable>
                                    )
                                }
                                {
                                    provided.placeholder
                                }
                            </Stack>
                        )
                    }
                </Droppable>
            </DragDropContext>
            {
                isOwner &&
                <>
                    <ButtonPlus click={() => setIsAddDialog(true)} />
                    <AddExercises
                        isAddDialog={isAddDialog}
                        skipThoseIDS={exercises}
                        closeDialog={() => setIsAddDialog(false)}
                        addThoseExercises={(array) => setExercises([...exercises, ...array])}
                    />
                    <ConfirmDialog
                        isDialog={isDialog}
                        confirm={deleteWorkoutPlan}
                        closeDialog={() => setIsDialog(false)}
                    />
                </>
            }
        </div>
    )
}

export default WorkoutPlansID