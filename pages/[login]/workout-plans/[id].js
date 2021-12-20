import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { useRouter } from "next/router"
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react"
import SaveIcon from '@mui/icons-material/Save'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import DeleteIcon from '@mui/icons-material/Delete'
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
    const [data, reloadWorkoutPlan] = useWorkoutPlan(router.query.id)
    const [isDialog, setIsDialog] = useState(false)

    const saveWorkoutPlan = async () => {
        setSaveLoading(true)
        let object = await save(true)
        if (object._id) {
            await overwriteThoseIDSinDB('workout_plan', [object])
        } else {
            await insertThoseIDStoDB('workout_plan', [object])
                .then((response) => router.push(`/${token.login}/workout-plans/${response[0]._id}`))
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

    const handleDelete = (_id) => setExercises(exercises.filter(x => x._id != _id))

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
        if (title !== undefined && description !== undefined && burnt !== undefined && exercises !== undefined) {
            await save()
        }
    }, [title, description, burnt, exercises])

    return (
        <div className="workoutPlansID">
            <div className="grid3WithButton">
                <div className="title">{t("Workout plan")}</div>
                <IconButton aria-label="delete" onClick={() => setIsDialog(true)}>
                    <DeleteIcon />
                </IconButton>
                <LoadingButton
                    loading={saveLoading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="outlined"
                    onClick={saveWorkoutPlan}
                >
                    {t('Save')}
                </LoadingButton>
            </div>
            <TextField
                disabled={!isOwner}
                id="outlined-basic"
                label="Name of plan"
                variant="outlined"
                value={title}
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                sx={{ width: '100%', marginTop: '10px' }}
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
                                                        onDelete={() => handleDelete(exercise._id)}
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
                        reload={reloadWorkoutPlan}
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