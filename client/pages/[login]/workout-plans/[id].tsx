import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { useRouter } from "next/router"
import { useAppSelector } from '../../../hooks/useRedux'
import { useState, useEffect, FunctionComponent } from "react"
import TextField from '@mui/material/TextField'
import DeleteIcon from '@mui/icons-material/Delete'
import Navbar from '../../../components/workout/Navbar'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import useWorkoutPlan from "../../../hooks/useWorkoutPlan"
import useTranslation from "next-translate/useTranslation"
import ButtonPlus from '../../../components/common/ButtonPlus'
import AddExercises from '../../../components/workout/AddExercises'
import ConfirmDialog from '../../../components/common/ConfirmDialog'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { deleteIndexedDB } from "../../../utils/indexedDB"
import { insertThoseIDStoDB, is_id, overwriteThoseIDSinDB, deleteThoseIDSfromDB } from "../../../utils/API"
import BottomFlyingGuestBanner from '../../../components/common/BottomFlyingGuestBanner'
import ExerciseProps from '../../../interfaces/exercise'
import WorkoutPlan from '../../../classes/workoutPlan'
import { useNotify } from '../../../hooks/useNotify'

const WorkoutPlansID: FunctionComponent = () => {
    const router: any = useRouter()
    const [burnt, setBurnt] = useState<any>(0)
    const [title, setTitle] = useState<any>("")
    const { t } = useTranslation('workout')
    const [exercises, setExercises] = useState<Array<ExerciseProps>>([])
    const [description, setDescription] = useState<any>("")
    const [isAddDialog, setIsAddDialog] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)
    const token: any = useAppSelector(state => state.token.value)
    const isOwner = token && token.login == router.query.login
    const [{ data, user }] = useWorkoutPlan(router.query.id)
    const [isDialog, setIsDialog] = useState(false)
    const basicInputLength = useAppSelector(state => state.config.basicInputLength)
    const requiredBasicInputLength = useAppSelector(state => state.config.requiredBasicInputLength)
    const [{ error }] = useNotify()

    const saveWorkoutPlan = async () => {
        setSaveLoading(true)
        const newWorkoutPlan = new WorkoutPlan(router.query.id, title, description, token._id, burnt, exercises).prepareForDB()
        if (!requiredBasicInputLength(newWorkoutPlan.title)) {
            error(t('Title is incorrect'))
        } else if (!basicInputLength(newWorkoutPlan.description)) {
            error(t('Description is incorrect'))
        } else if (newWorkoutPlan.exercises.length < 1) {
            error(t('Exercises are incorrect'))
        } else {
            if (await is_id(newWorkoutPlan._id)) {
                await overwriteThoseIDSinDB('workout_plan', [newWorkoutPlan])
            } else {
                await deleteIndexedDB('workout_plan', newWorkoutPlan._id)
                delete newWorkoutPlan._id
                await insertThoseIDStoDB('workout_plan', [newWorkoutPlan])
            }
            router.push(`/${token.login}/workout-plans/`)
        }
        setSaveLoading(false)
    }

    const deleteWorkoutPlan = async () => {
        setSaveLoading(true)
        if (!await is_id(router.query.id)) {
            await deleteIndexedDB('workout_plan', router.query.id)
        } else {
            await deleteThoseIDSfromDB('workout_plan', [router.query.id])
        }
        router.push(`/${token.login}/workout-plans`)
        setSaveLoading(false)
    }

    const handleOnDragEnd = async (result: any) => {
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

    useEffect(() => {
        (async () => {
            if (!await is_id(router.query.id)) {
                if (title != undefined && description != undefined && burnt != undefined && exercises != undefined) {
                    if (isOwner) {
                        new WorkoutPlan(router.query.id, title, description, token._id, burnt, exercises).autoSave()
                    }
                }
            }
        })()
    }, [title, description, burnt, exercises])

    return (
        <div className="workoutPlansID">
            <Navbar
                title="Workout plan"
                where="workout-plans"
                saveLoading={saveLoading}
                saveWorkout={saveWorkoutPlan}
                setIsDialog={(Boolean: boolean) => setIsDialog(Boolean)}
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
                        (provided: any) => (
                            <Stack direction="column" spacing={1} {...provided.droppableProps} ref={provided.innerRef}>
                                {
                                    exercises && exercises.map((exercise: ExerciseProps, i: number) =>
                                        <Draggable key={exercise._id} draggableId={exercise._id} index={i}>
                                            {
                                                (provided: any) => (
                                                    <Chip
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                        disabled={!isOwner}
                                                        label={`${i + 1}. ${exercise.name}`}
                                                        onDelete={() => setExercises(exercises.filter((x: ExerciseProps) => x._id != exercise._id))}
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
                isOwner ?
                    (
                        <>
                            <ButtonPlus click={() => setIsAddDialog(true)} />
                            <AddExercises
                                isAddDialog={isAddDialog}
                                skipThoseIDS={exercises}
                                closeDialog={() => setIsAddDialog(false)}
                                addThoseExercises={(array: Array<ExerciseProps>) => setExercises([...exercises, ...array])}
                            />
                            <ConfirmDialog
                                isDialog={isDialog}
                                confirm={deleteWorkoutPlan}
                                closeDialog={() => setIsDialog(false)}
                            />
                        </>
                    ) : (
                        <BottomFlyingGuestBanner user={user} />
                    )
            }
        </div>
    )
}

export default WorkoutPlansID