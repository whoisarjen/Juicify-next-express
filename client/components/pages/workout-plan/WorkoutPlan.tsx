import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import DeleteIcon from '@mui/icons-material/Delete'
import Navbar from '../../common/navbar-workout'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import AddExercises from '../../common/dialog-add-exercise'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { ExerciseSchemaProps } from '../../../schema/exercise.schema'
import { useWorkoutPlanProps } from './useWorkoutPlan'
import BottomFlyingGuestBanner from '../../common/banner-guest-bottom'

const BaseWorkoutPlan = ({ t, user, token, errors, fields, append, remove, handleOnDragEnd, register, deleteWorkoutPlan, handleSubmit, saveWorkoutPlan, isLoading }: useWorkoutPlanProps) => {
    return (
        <form>
            <Navbar
                title="workout:WORKOUT_PLAN"
                where="workout/plans"
                isLoading={isLoading}
                saveWorkout={handleSubmit(saveWorkoutPlan)}
                deleteWorkout={deleteWorkoutPlan}
            />
            <TextField
                disabled={token?.login != user?.login}
                label={t('NAME_OF_WORKOUT')}
                {...register('title')}
                variant="outlined"
                sx={{ width: '100%', marginTop: '10px' }}
                type="text"
                focused
                error={typeof errors.title === 'undefined' ? false : true}
                helperText={errors.title?.message && t(`notify:${errors.title.message || ''}`)}
            />
            <TextField
                disabled={token?.login != user?.login}
                variant="outlined"
                label={t('DESCRIPTION')}
                type="text"
                focused
                {...register('description')}
                sx={{ width: '100%', marginTop: '10px' }}
                error={typeof errors.description === 'undefined' ? false : true}
                helperText={errors.description?.message && t(`notify:${errors.description.message || ''}`)}
            />
            <TextField
                disabled={token?.login != user?.login}
                variant="outlined"
                label={t('BURNT_CALORIES')}
                type="number"
                {...register('burnt')}
                focused
                sx={{ width: '100%', marginTop: '10px' }}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                error={typeof errors.burnt === 'undefined' ? false : true}
                helperText={errors.burnt?.message && t(`notify:${errors.burnt.message || ''}`)}
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
                                                        disabled={token?.login != user?.login}
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
            {user?.login && token?.login == user?.login && <AddExercises skipThoseIDS={fields} addThoseExercises={(array: Array<ExerciseSchemaProps>) => append(array)} />}
            {user?.login && token?.login != user?.login && <BottomFlyingGuestBanner user={user} />}
        </form>
    )
}

export default BaseWorkoutPlan;