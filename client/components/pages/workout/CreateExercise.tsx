import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useTranslation from 'next-translate/useTranslation';
import LoadingButton from '@mui/lab/LoadingButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNotify } from '../../../hooks/useNotify';
import { ExerciseSchemaProps, ExerciseSchema } from '../../../schema/exercise.schema';
import { insertThoseIDStoDB } from '../../../utils/db.utils';

interface CreateExerciseProps {
    closeCreateExercise: () => void,
    isCreateExercise: boolean,
    created: (arg0: string) => void
}

const CreateExercise = ({ closeCreateExercise, isCreateExercise, created }: CreateExerciseProps) => {
    const { t } = useTranslation('workout')
    const [loading, setLoading] = useState(false)
    const { success } = useNotify()

    const { register, formState: { errors }, handleSubmit } = useForm<ExerciseSchemaProps>({
        resolver: zodResolver(ExerciseSchema)
    })

    const onSubmit = async (values: ExerciseSchemaProps) => {
        setLoading(true);
        await insertThoseIDStoDB('exercise', [values])
            .then(() => created(values.name))
            .then(() => success())
            .finally(() => setLoading(false))
    }

    return (
        <div>
            <Dialog open={isCreateExercise}>
                <form style={{ margin: 'auto 0' }} onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>{t('Create exercise')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t('Create exercise description')}
                        </DialogContentText>
                        <TextField
                            {...register('name')}
                            error={typeof errors.name === 'undefined' ? false : true}
                            helperText={
                                errors.name?.message &&
                                errors.name?.message.length &&
                                errors.name?.message
                            }
                            required
                            autoFocus
                            margin="dense"
                            id="name"
                            label={t('Name of exercise')}
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeCreateExercise}>{t('Cancel')}</Button>
                        <LoadingButton loading={loading} type="submit">
                            {t('Submit')}
                        </LoadingButton>
                    </DialogActions>
                </form>
            </Dialog>
        </div >
    );
}

export default CreateExercise;