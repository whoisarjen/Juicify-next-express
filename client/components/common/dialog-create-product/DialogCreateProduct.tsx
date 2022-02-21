import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useDialogCreateProductProps } from './useDialogCreateProduct';
import styled from 'styled-components'

const ButtonHolder = styled.div`
    width: 100%;
    display: grid;
`

const BaseDialogCreateProduct = ({ children, isDialog, setIsDialog, defaultBarcode, handleSubmit, register, onSubmit, errors, code, setCode, loading, t }: useDialogCreateProductProps) => {
    return (
        <>
            <ButtonHolder onClick={() => setIsDialog(true)}>{children}</ButtonHolder>
            <Dialog open={isDialog}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>{t('Create product')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t('Create product description')}
                        </DialogContentText>
                        <TextField
                            type="text"
                            fullWidth
                            variant="standard"
                            label={t('Name of product')}
                            {...register('name')}
                            error={typeof errors.name === 'undefined' ? false : true}
                            helperText={
                                errors.name?.message &&
                                errors.name?.message.length &&
                                errors.name?.message
                            }
                        />
                        {
                            defaultBarcode > 0 &&
                            <TextField
                                margin="dense"
                                id="name"
                                label="Barcode"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                type="Number"
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                fullWidth
                                variant="standard"
                            />
                        }
                        <TextField
                            sx={{ marginTop: '12px' }}
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            fullWidth
                            variant="standard"
                            label={t('Proteins')}
                            {...register('p')}
                            error={typeof errors.p === 'undefined' ? false : true}
                            helperText={
                                errors.p?.message &&
                                errors.p?.message.length &&
                                errors.p?.message
                            }
                            InputProps={{
                                endAdornment: <InputAdornment position="end">{t('g in 100g/ml')}</InputAdornment>,
                            }}
                        />
                        <TextField
                            sx={{ marginTop: '12px' }}
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            fullWidth
                            variant="standard"
                            label={t('Carbs')}
                            {...register('c')}
                            error={typeof errors.c === 'undefined' ? false : true}
                            helperText={
                                errors.c?.message &&
                                errors.c?.message.length &&
                                errors.c?.message
                            }
                            InputProps={{
                                endAdornment: <InputAdornment position="end">{t('g in 100g/ml')}</InputAdornment>,
                            }}
                        />
                        <TextField
                            sx={{ marginTop: '12px' }}
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            fullWidth
                            variant="standard"
                            label={t('Sugar')}
                            {...register('s')}
                            error={typeof errors.s === 'undefined' ? false : true}
                            helperText={
                                errors.s?.message &&
                                errors.s?.message.length &&
                                errors.s?.message
                            }
                            InputProps={{
                                endAdornment: <InputAdornment position="end">{t('g in 100g/ml')}</InputAdornment>,
                            }}
                        />
                        <TextField
                            sx={{ marginTop: '12px' }}
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            fullWidth
                            variant="standard"
                            label={t('Fats')}
                            {...register('f')}
                            error={typeof errors.f === 'undefined' ? false : true}
                            helperText={
                                errors.f?.message &&
                                errors.f?.message.length &&
                                errors.f?.message
                            }
                            InputProps={{
                                endAdornment: <InputAdornment position="end">{t('g in 100g/ml')}</InputAdornment>,
                            }}
                        />
                        <TextField
                            sx={{ marginTop: '12px' }}
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            fullWidth
                            variant="standard"
                            label={t('Fiber')}
                            {...register('fi')}
                            error={typeof errors.fi === 'undefined' ? false : true}
                            helperText={
                                errors.fi?.message &&
                                errors.fi?.message.length &&
                                errors.fi?.message
                            }
                            InputProps={{
                                endAdornment: <InputAdornment position="end">{t('g in 100g/ml')}</InputAdornment>,
                            }}
                        />
                        <TextField
                            sx={{ marginTop: '12px' }}
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            fullWidth
                            variant="standard"
                            label={t('Salt')}
                            {...register('na')}
                            error={typeof errors.na === 'undefined' ? false : true}
                            helperText={
                                errors.na?.message &&
                                errors.na?.message.length &&
                                errors.na?.message
                            }
                            InputProps={{
                                endAdornment: <InputAdornment position="end">{t('g in 100g/ml')}</InputAdornment>,
                            }}
                        />
                        <TextField
                            sx={{ marginTop: '12px' }}
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            fullWidth
                            variant="standard"
                            label={t('Ethanol')}
                            {...register('ethanol')}
                            error={typeof errors.ethanol === 'undefined' ? false : true}
                            helperText={
                                errors.ethanol?.message &&
                                errors.ethanol?.message.length &&
                                errors.ethanol?.message
                            }
                            InputProps={{
                                endAdornment: <InputAdornment position="end">{t('g in 100g/ml')}</InputAdornment>,
                            }}
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    {...register('checkMe')}
                                />
                            }
                            label={t('Should be available for all?')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsDialog(false)}>{t('Cancel')}</Button>
                        <LoadingButton
                            loading={loading}
                            variant="contained"
                            type="submit"
                        >
                            {t('Submit')}
                        </LoadingButton>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default BaseDialogCreateProduct;