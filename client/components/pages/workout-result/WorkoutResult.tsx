import TextField from '@mui/material/TextField';
import { ValueSchemaProps } from '../../../schema/workoutResult.schema';
import { reverseDateDotes } from '../../../utils/date.utils';
import { is_id } from '../../../utils/db.utils';
import BottomFlyingGuestBanner from '../../common/banner-guest-bottom';
import Navbar from '../../common/navbar-workout'
import ButtonMoreOptionsWorkoutResult from '../../common/button-more-options-workout-result';
import ResultBox from '../../common/box-result';
import { useWorkoutResultProps } from './useWorkoutResult';

const BaseWorkoutResult = ({ t, isLoading, handleSubmit, onSubmit, deleteEverything, errors, router, getValues, register, fields, addExercises, remove, token, user, updateResults }: useWorkoutResultProps) => {
    return (
        <form>
            <Navbar
                title="workout:WORKOUT_RESULT"
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
                helperText={errors.title?.message && t(`notify:${errors.title.message || ''}`)}
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
                    focused
                    {...register('workout_description')}
                    error={typeof errors.workout_description === 'undefined' ? false : true}
                    helperText={errors.workout_description?.message && t(`notify:${errors.workout_description.message || ''}`)}
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
                    focused
                    {...register('burnt')}
                    error={typeof errors.burnt === 'undefined' ? false : true}
                    helperText={errors.burnt?.message && t(`notify:${errors.burnt.message || ''}`)}
                />
            }
            <TextField
                variant="outlined"
                label={t("Notes")}
                type="text"
                sx={{ width: '100%', marginTop: '10px' }}
                multiline
                rows={4}
                focused
                {...register('description')}
                error={typeof errors.description === 'undefined' ? false : true}
                helperText={errors.description?.message && t(`notify:${errors.description.message || ''}`)}
            />

            {
                fields.map((result: any, index: number) =>
                    <div style={fields.length == (index + 1) ? { marginBottom: '100px' } : {}} key={(result._id || '') + index}>
                        <ResultBox
                            key={(result._id || '') + index}
                            result={result}
                            isOwner={token?.login == router?.query?.login}
                            setNewValues={(values: Array<ValueSchemaProps>) => updateResults({ values, result, index })}
                            deleteExerciseWithIndex={() => remove(index)}
                        />
                    </div>
                )
            }

            {token?.login == router?.query?.login &&
                <ButtonMoreOptionsWorkoutResult exercises={fields as any} setExercises={addExercises} />}

            {token?.login != user?.login && user?.login && <BottomFlyingGuestBanner user={user} />}
        </form>
    );
}

export default BaseWorkoutResult;