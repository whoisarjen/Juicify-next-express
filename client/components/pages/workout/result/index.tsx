import TextField from '@mui/material/TextField';
import { ValueSchemaProps } from '../../../../schema/workoutResult.schema';
import { reverseDateDotes } from '../../../../utils/date.utils';
import { is_id } from '../../../../utils/db.utils';
import BottomFlyingGuestBanner from '../../../common/BottomFlyingGuestBanner';
import ConfirmDialog from '../../../common/ConfirmDialog';
import Navbar from '../Navbar'
import AddResultMoreOptions from '../results/MoreOptionsButton';
import ResultBox from '../results/ResultBox';
import { useWorkoutResultProps } from './useWorkoutResult';

const WorkoutResults = ({ t, isLoading, handleSubmit, onSubmit, deleteEverything, errors, router, getValues, register, fields, addExercises, deleteExerciseIndex, setDeleteExerciseIndex, deleteExercise, token, user, updateResults }: useWorkoutResultProps) => {
    return (
        <form>
            <Navbar
                title="Workout result"
                where="workout/results"
                isLoading={isLoading}
                saveWorkout={handleSubmit(onSubmit)}
                deleteWorkout={deleteEverything}
            />
            <TextField
                variant="outlined"
                label={t("Title")}
                type="text"
                sx={{ width: '100%', marginTop: '10px' }}
                disabled
                defaultValue={' '}
                {...register('title')}
                error={typeof errors.title === 'undefined' ? false : true}
                helperText={
                    errors.title?.message &&
                    errors.title?.message.length &&
                    errors.title?.message
                }
            />
            <TextField
                variant="outlined"
                label={t("Date")}
                type="text"
                sx={{ width: '100%', marginTop: '10px' }}
                disabled
                defaultValue={reverseDateDotes(router.query.date)}
            />
            {
                getValues()?.workout_description &&
                <TextField
                    disabled
                    variant="outlined"
                    label={t("Description of workout plan")}
                    type="text"
                    sx={{ width: '100%', marginTop: '10px' }}
                    defaultValue={' '}
                    {...register('workout_description')}
                    error={typeof errors.workout_description === 'undefined' ? false : true}
                    helperText={
                        errors.workout_description?.message &&
                        errors.workout_description?.message.length &&
                        errors.workout_description?.message
                    }
                />
            }
            {
                !(async () => await is_id(router.query.id)) &&
                <TextField
                    variant="outlined"
                    label={t("Burnt")}
                    type="text"
                    disabled
                    sx={{ width: '100%', marginTop: '10px' }}
                    defaultValue={' '}
                    {...register('burnt')}
                    error={typeof errors.burnt === 'undefined' ? false : true}
                    helperText={
                        errors.burnt?.message &&
                        errors.burnt?.message.length &&
                        errors.burnt?.message
                    }
                />
            }
            <TextField
                variant="outlined"
                label={t("Notes")}
                type="text"
                sx={{ width: '100%', marginTop: '10px' }}
                multiline
                rows={4}
                defaultValue={' '}
                {...register('description')}
                error={typeof errors.description === 'undefined' ? false : true}
                helperText={
                    errors.description?.message &&
                    errors.description?.message.length &&
                    errors.description?.message
                }
            />
            {
                fields.map((result: any, index: number) =>
                    <div style={fields.length == (index + 1) ? { marginBottom: '100px' } : {}} key={(result._id || '') + index}>
                        <ResultBox
                            key={(result._id || '') + index}
                            result={result}
                            isOwner={token?.login == router.query?.login}
                            setNewValues={(values: Array<ValueSchemaProps>) => updateResults({ values, result, index })}
                            openDeleteExercise={() => setDeleteExerciseIndex(index)}
                        />
                    </div>
                )
            }
            {
                token?.login == router.query?.login
                    ?
                    <>
                        <ConfirmDialog
                            isDialog={deleteExerciseIndex !== false ? true : false}
                            closeDialog={() => setDeleteExerciseIndex(false)}
                            confirm={() => deleteExercise(deleteExerciseIndex as number)}
                        />
                        <AddResultMoreOptions
                            exercises={[...fields.map((x: any) => {
                                x.l = x.name.length
                                return x
                            })]}
                            setExercises={addExercises}
                        />
                    </>
                    :
                    <BottomFlyingGuestBanner user={user} />
            }
        </form>
    );
}

export default WorkoutResults;