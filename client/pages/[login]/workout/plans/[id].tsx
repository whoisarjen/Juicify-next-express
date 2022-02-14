import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { useRouter } from "next/router"
import { useAppSelector } from '../../../../hooks/useRedux'
import { useState, useEffect } from "react"
import TextField from '@mui/material/TextField'
import DeleteIcon from '@mui/icons-material/Delete'
import Navbar from '../../../../components/workout/Navbar'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import useWorkoutPlan from "../../../../hooks/useWorkoutPlan"
import useTranslation from "next-translate/useTranslation"
import ButtonPlus from '../../../../components/common/ButtonPlus'
import AddExercises from '../../../../components/workout/AddExercises'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { deleteIndexedDB } from "../../../../utils/indexedDB.utils"
import { is_id, deleteThoseIDSfromDB, insertThoseIDStoDBController } from "../../../../utils/db.utils"
import BottomFlyingGuestBanner from '../../../../components/common/BottomFlyingGuestBanner'
import { useNotify } from '../../../../hooks/useNotify'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { WorkoutPlanSchemaProps, WorkoutPlanSchema } from '../../../../schema/workoutPlan.schema'
import { ExerciseSchemaProps } from '../../../../schema/exercise.schema'

const WorkoutPlansID = () => {
    const router: any = useRouter()
    const { t } = useTranslation('workout')
    const [isAddDialog, setIsAddDialog] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)
    const token: any = useAppSelector(state => state.token.value)
    const { data, user } = useWorkoutPlan(router.query.id)
    const [{ error }] = useNotify()

    const deleteWorkoutPlan = async () => {
        try {
            setSaveLoading(true)
            if (!await is_id(router.query.id)) {
                await deleteIndexedDB('workout_plan', router.query.id)
            } else {
                await deleteThoseIDSfromDB('workout_plan', [{ _id: router.query.id }])
            }
            router.push(`/${token.login}/workout/plans`)
        } finally {
            setSaveLoading(false)
        }
    }

    const { register, formState: { errors }, handleSubmit, control, reset } = useForm<WorkoutPlanSchemaProps>({
        resolver: zodResolver(WorkoutPlanSchema)
    })

    const { fields, append, remove, move } = useFieldArray(
        {
            control,
            name: "exercises",
        }
    )

    const onSubmit = async (values: WorkoutPlanSchemaProps) => {
        try {
            setSaveLoading(true)
            await insertThoseIDStoDBController('workout_plan', [{
                _id: router.query.id,
                ...(values.title && values.title.trim() && { title: values.title.trim() }),
                ...(values.description && values.description.trim() && { description: values.description.trim() }),
                ...(values.burnt && { burnt: values.burnt }),
                ...(values.exercises && { exercises: values.exercises }),
            }])
            router.push(`/${token.login}/workout/plans/`)
        } catch (e: any) {
            console.log(e)
            error(e.message)
        } finally {
            setSaveLoading(false);
        }
    }

    const handleOnDragEnd = async (result: any) => {
        if (!result.destination) return
        move(result.source.index, result.destination.index)
    }

    useEffect(() => reset(data), [data])

    return (
        <form>
            {
                data &&
                <>
                    <Navbar
                        title="Workout plan"
                        where="workout/plans"
                        saveLoading={saveLoading}
                        saveWorkout={handleSubmit(onSubmit)}
                        deleteWorkout={deleteWorkoutPlan}
                    />
                    <TextField
                        disabled={token.login != router.query.login}
                        variant="outlined"
                        label={t('NAME_OF_WORKOUT')}
                        type="text"
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
                                            fields.map((exercise: ExerciseSchemaProps, i: number) =>
                                                exercise._id &&
                                                <Draggable key={exercise._id} draggableId={exercise._id} index={i}>
                                                    {
                                                        (provided: any) => (
                                                            <Chip
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                ref={provided.innerRef}
                                                                disabled={token.login != router.query.login}
                                                                label={`${i + 1}. ${exercise.name}`}
                                                                onDelete={() => remove(i)}
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
                        token.login == router.query.login
                            ?
                            <>
                                <ButtonPlus click={() => setIsAddDialog(true)} />
                                <AddExercises
                                    isAddDialog={isAddDialog}
                                    skipThoseIDS={fields}
                                    closeDialog={() => setIsAddDialog(false)}
                                    addThoseExercises={(array: Array<ExerciseSchemaProps>) => append(array)}
                                />
                            </>
                            :
                            <BottomFlyingGuestBanner user={user} />
                    }
                </>
            }
        </form>
    )
}

export default WorkoutPlansID