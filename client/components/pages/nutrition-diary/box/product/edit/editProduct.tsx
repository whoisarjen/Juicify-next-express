import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEditProductProps } from './useEditProduct';
import ConfirmDialog from '../../../../../common/confirmDialog';

const BaseEditProduct = ({ product, children, isDialog, setIsDialog, token, register, errors, handleSubmit, changeNutritionDiary, deleteProduct, t }: useEditProductProps) => {
    return (
        <form onSubmit={handleSubmit(changeNutritionDiary)}>
            <div onClick={() => setIsDialog(true)}>{children}</div>
            <Dialog
                open={isDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {t('Edit')}
                </DialogTitle>
                <DialogContent>
                    {
                        product?.meal >= 0 &&
                        <Select
                            sx={{ width: '100%' }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={product.meal}
                            {...register('meal')}
                        >
                            {
                                Array.from(Array(token.meal_number).keys()).map((x) =>
                                    <MenuItem key={x} value={x}>{t('Meal')} {x + 1}</MenuItem>
                                )
                            }
                        </Select>
                    }
                    {
                        product.activity &&
                        <TextField
                            type="text"
                            label={t('Activity')}
                            sx={{ marginTop: '10px', width: '100%' }}
                            {...register('activity')}
                            error={typeof errors.activity === 'undefined' ? false : true}
                            helperText={
                                errors.activity?.message &&
                                errors.activity?.message.length &&
                                errors.activity?.message
                            }
                        />
                    }
                    {
                        product.calories &&
                        <TextField
                            type="number"
                            label={t('How many calories')}
                            sx={{ marginTop: '10px', width: '100%' }}
                            {...register('calories')}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            error={typeof errors.calories === 'undefined' ? false : true}
                            helperText={
                                errors.calories?.message &&
                                errors.calories?.message.length &&
                                errors.calories?.message
                            }
                        />
                    }
                    {
                        product.how_many &&
                        <TextField
                            type="number"
                            label={t('How many times 100g/ml')}
                            sx={{ marginTop: '10px', width: '100%' }}
                            {...register('how_many')}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            error={typeof errors.how_many === 'undefined' ? false : true}
                            helperText={
                                errors.how_many?.message &&
                                errors.how_many?.message.length &&
                                errors.how_many?.message
                            }
                        />
                    }

                </DialogContent>
                <DialogActions>
                    <ConfirmDialog confirmed={() => deleteProduct(product._id)}>
                        <Button sx={{ color: 'red' }}>{t('Delete')}</Button>
                    </ConfirmDialog>
                    <Button onClick={() => setIsDialog(false)}>{t('Deny')}</Button>
                    <Button type="submit" onClick={handleSubmit(changeNutritionDiary)}>{t('Confirm')}</Button>
                </DialogActions>
            </Dialog>
        </form>
    );
}

export default BaseEditProduct;