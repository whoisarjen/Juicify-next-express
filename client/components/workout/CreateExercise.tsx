import { FunctionComponent, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useTranslation from 'next-translate/useTranslation';
import { useAppSelector } from "../../hooks/useRedux";
import { insertThoseIDStoDB } from '../../utils/API';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNotify } from '../../hooks/useNotify';
import Exercise from '../../classes/workout/exercise';

interface CreateExerciseProps {
    closeCreateExercise: () => void,
    isCreateExercise: boolean,
    created: (arg0: string) => void
}

const CreateExercise: FunctionComponent<CreateExerciseProps> = ({ closeCreateExercise, isCreateExercise, created }) => {
    const { t } = useTranslation('workout')
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const token: any = useAppSelector(state => state.token.value)
    const requiredBasicInputLength = useAppSelector(state => state.config.requiredBasicInputLength)
    const [{ success }] = useNotify()

    const handleCreateExercise = async () => {
        if (requiredBasicInputLength(name)) {
            setLoading(true)
            const newExercise = new Exercise({ _id: 'XD' + new Date().getTime(), name, l: name.length, user_ID: token._id })
            await insertThoseIDStoDB('exercise', [newExercise])
                .then(() => created(newExercise.name))
                .then(() => success())
                .finally(() => setLoading(false))
        }
    }

    return (
        <div>
            <Dialog open={isCreateExercise}>
                <DialogTitle>{t('Create exercise')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('Create exercise description')}
                    </DialogContentText>
                    <TextField
                        error={
                            name.length > 0 && !requiredBasicInputLength(name)
                        }
                        helperText={
                            name.length > 0 && !requiredBasicInputLength(name)
                                ? t("home:requiredBasicInputLength")
                                : ""
                        }
                        required
                        autoFocus
                        margin="dense"
                        id="name"
                        label={t('Name of exercise')}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeCreateExercise}>{t('Cancel')}</Button>
                    <LoadingButton loading={loading} onClick={handleCreateExercise}>
                        {t('Submit')}
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CreateExercise;