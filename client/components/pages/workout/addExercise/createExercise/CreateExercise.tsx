import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import { useCreateExerciseProps } from './useCreateExercise';
import styled from 'styled-components';

const GridFullWidth = styled.div`
    display: grid;
    width: 100%;
`

const BaseCreateExercise = ({ isOpen, setIsOpen, handleSubmit, onSubmit, errors, t, register, loading }: useCreateExerciseProps) => {
    return (
        <>
            <GridFullWidth>
                <Button variant="outlined" onClick={() => setIsOpen(true)} sx={{ margin: 'auto' }}>
                    {t('Create exercise')}
                </Button>
            </GridFullWidth>
            <Dialog open={isOpen}>
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
                        <Button onClick={() => setIsOpen(false)}>{t('Cancel')}</Button>
                        <LoadingButton loading={loading} type="submit">
                            {t('Submit')}
                        </LoadingButton>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default BaseCreateExercise;