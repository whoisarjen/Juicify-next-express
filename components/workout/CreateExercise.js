import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useTranslation from 'next-translate/useTranslation';
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify'
import { insertThoseIDStoDB } from '../../utils/API';
import LoadingButton from '@mui/lab/LoadingButton';

const CreateExercise = ({ closeCreateExercise, isCreateExercise, created }) => {
    const { t } = useTranslation('workout')
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const token = useSelector(state => state.token.value)
    const requiredBasicInputLength = useSelector(state => state.config.requiredBasicInputLength)

    const handleCreateExercise = async () => {
        if (requiredBasicInputLength(name)) {
            setLoading(true)
            let object = {
                _id: 'XD' + new Date().getTime(),
                name: name,
                l: name.length,
                user_ID: token._id
            }
            await insertThoseIDStoDB('exercise', [object])
                .then(() => created(object.name))
                .then(() => {
                    toast.success(t('home:Success'), {
                        position: "bottom-right",
                        autoClose: 2000,
                        closeOnClick: true,
                    })
                })
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
                <ToastContainer />
            </Dialog>
        </div>
    );
}

export default CreateExercise;