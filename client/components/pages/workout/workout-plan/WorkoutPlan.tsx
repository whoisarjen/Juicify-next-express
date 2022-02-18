import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import DeleteIcon from '@mui/icons-material/Delete'
import Navbar from '../navbar'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import AddExercises from '../addExercise'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { ExerciseSchemaProps } from '../../../../schema/exercise.schema'
import { useWorkoutPlanProps } from './useWorkoutPlan'
import BottomFlyingGuestBanner from '../../../common/bottomFlyingGuestBanner'

const BaseWorkoutPlan = ({ t, user, token, errors, fields, append, remove, handleOnDragEnd, register, deleteWorkoutPlan, handleSubmit, saveWorkoutPlan, isLoading }: useWorkoutPlanProps) => {
    return (
        <form>
            <Navbar
                title="Workout plan"
                where="workout/plans"
                isLoading={isLoading}
                saveWorkout={handleSubmit(saveWorkoutPlan)}
                deleteWorkout={deleteWorkoutPlan}
            />
            <TextField
                disabled={token.login != user.login}
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
                disabled={token.login != user.login}
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
                disabled={token.login != user.login}
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
                                                        disabled={token.login != user.login}
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
            <AddExercises skipThoseIDS={fields} addThoseExercises={(array: Array<ExerciseSchemaProps>) => append(array)} />
            <BottomFlyingGuestBanner user={user} />
        </form>
    )
}

export default BaseWorkoutPlan;