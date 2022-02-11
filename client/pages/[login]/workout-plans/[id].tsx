import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { useRouter } from "next/router"
import { useAppSelector } from '../../../hooks/useRedux'
import { useState, FunctionComponent } from "react"
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
import { deleteIndexedDB } from "../../../utils/indexedDB.utils"
import { insertThoseIDStoDB, is_id, overwriteThoseIDSinDB, deleteThoseIDSfromDB } from "../../../utils/db.utils"
import BottomFlyingGuestBanner from '../../../components/common/BottomFlyingGuestBanner'
import ExerciseProps from '../../../interfaces/workout/exercise.interface'
import { useNotify } from '../../../hooks/useNotify'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { CreateWorkoutPlanSchemaProps, CreateWorkoutPlanSchema } from '../../../schema/workoutPlan.schema'

const WorkoutPlansID: FunctionComponent = () => {
    const router: any = useRouter()
    const { t } = useTranslation('workout')
    const [exercises, setExercises] = useState<Array<ExerciseProps>>([])
    const [isAddDialog, setIsAddDialog] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)
    const token: any = useAppSelector(state => state.token.value)
    const [{ data, user }] = useWorkoutPlan(router.query.id)
    const [isDialog, setIsDialog] = useState(false)
    const [{ error }] = useNotify()

    const deleteWorkoutPlan = async () => {
        try {
            setSaveLoading(true)
            if (!await is_id(router.query.id)) {
                await deleteIndexedDB('workout_plan', router.query.id)
            } else {
                await deleteThoseIDSfromDB('workout_plan', [{ _id: router.query.id }])
            }
            router.push(`/${token.login}/workout-plans`)
        } finally {
            setSaveLoading(false)
        }
    }

    const handleOnDragEnd = async (result: any) => {
        if (!result.destination) return
        const newExercises = Array.from(exercises)
        const [reorderedExercises] = newExercises.splice(result.source.index, 1)
        newExercises.splice(result.destination.index, 0, reorderedExercises)
        setExercises(newExercises)
    }

    const handleKeyPress = (event: any) => {
        if (event.key === "Enter") {
            handleSubmit(onSubmit)
        }
    };

    const { register, formState: { errors }, handleSubmit } = useForm<CreateWorkoutPlanSchemaProps>({
        resolver: zodResolver(CreateWorkoutPlanSchema)
    })

    const onSubmit = async (values: CreateWorkoutPlanSchemaProps) => {
        try {
            setSaveLoading(true)
            if (!exercises.length) return error('ADD_SOME_EXERCISES')
            if (await is_id(router.query.id)) {
                await overwriteThoseIDSinDB('workout_plan', [{
                    _id: router.query.id,
                    title: values.title,
                    ...(values.description && { description: values.description }),
                    ...(values.burnt && { burnt: values.burnt }),
                    exercises,
                }])
            } else {
                await deleteIndexedDB('workout_plan', router.query.id)
                await insertThoseIDStoDB('workout_plan', [{
                    _id: router.query.id,
                    title: values.title,
                    ...(values.description && { description: values.description }),
                    ...(values.burnt && { burnt: values.burnt }),
                    exercises,
                }])
            }
            router.push(`/${token.login}/workout-plans/`)
        } catch (e: any) {
            console.log(e)
            error(e.message)
        } finally {
            setSaveLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {
                data &&
                <>
                    <Navbar
                        title="Workout plan"
                        where="workout-plans"
                        saveLoading={saveLoading}
                        saveWorkout={handleSubmit(onSubmit)}
                        setIsDialog={(Boolean: boolean) => setIsDialog(Boolean)}
                    />
                    <TextField
                        disabled={token.login != router.query.login}
                        variant="outlined"
                        label={t('NAME_OF_WORKOUT')}
                        type="text"
                        defaultValue={data.title}
                        onKeyPress={handleKeyPress}
                        {...register('title')}
                        sx={{ width: '100%', marginTop: '10px' }}
                        error={typeof errors.title === 'undefined' ? false : true}
                        helperText={
                            errors.title?.message &&
                            errors.title?.message.length &&
                            errors.title?.message
                        }
                    />
                    <TextField
                        disabled={token.login != router.query.login}
                        variant="outlined"
                        label={t('DESCRIPTION')}
                        type="text"
                        defaultValue={data.description}
                        onKeyPress={handleKeyPress}
                        {...register('description')}
                        sx={{ width: '100%', marginTop: '10px' }}
                        error={typeof errors.description === 'undefined' ? false : true}
                        helperText={
                            errors.description?.message &&
                            errors.description?.message.length &&
                            errors.description?.message
                        }
                    />
                    <TextField
                        disabled={token.login != router.query.login}
                        variant="outlined"
                        label={t('BURNT_CALORIES')}
                        type="number"
                        defaultValue={data.burnt}
                        onKeyPress={handleKeyPress}
                        {...register('burnt')}
                        sx={{ width: '100%', marginTop: '10px' }}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        error={typeof errors.burnt === 'undefined' ? false : true}
                        helperText={
                            errors.burnt?.message &&
                            errors.burnt?.message.length &&
                            errors.burnt?.message
                        }
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
                                                                disabled={token.login != router.query.login}
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
                        token.login == router.query.login ?
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
                </>
            }
        </form>
    )
}

export default WorkoutPlansID