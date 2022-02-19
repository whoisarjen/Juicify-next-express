import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEditProductProps } from './useEditProduct';
import ConfirmDialog from '../../../../common/confirmDialog';

const BaseEditProduct = ({ product, isDialog, closeDialog, deleteProduct, meal, setMeal, token, t, activity, setActivity, requiredBasicInputLength, calories, setCalories, beforeChangeProduct, requiredBasicInputNumber, howMany, setHowMany, requireNumberDiffrentThanZero }: useEditProductProps) => {
    return (
        <div className="dialogEditProduct">
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
                        product.meal &&
                            parseInt(product.meal.toString()) >= 0
                            ?
                            <Select
                                sx={{ width: '100%' }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={meal}
                                onChange={(e) => setMeal(e.target.value)}
                            >
                                {
                                    [...Array(token.meal_number)].map((x, i) =>
                                        <MenuItem key={i} value={i}>{t('Meal')} {i + 1}</MenuItem>
                                    )
                                }
                            </Select>
                            :
                            <></>
                    }
                    {
                        product.activity
                            ?
                            <TextField
                                type="text"
                                label={t('Activity')}
                                sx={{ marginTop: '10px', width: '100%' }}
                                value={activity}
                                onChange={(e) => setActivity(e.target.value)}
                                error={
                                    activity &&
                                    activity.length > 0 &&
                                    !requiredBasicInputLength(activity)
                                }
                                helperText={
                                    activity &&
                                        activity.length > 0 &&
                                        !requiredBasicInputLength(activity)
                                        ? t("home:requiredBasicInputLength")
                                        : ""
                                }
                            />
                            :
                            <></>
                    }
                    {
                        product.calories
                            ?
                            <TextField
                                type="number"
                                label={t('How many calories')}
                                sx={{ marginTop: '10px', width: '100%' }}
                                value={calories}
                                onChange={(e) => setCalories(e.target.value)}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                error={
                                    calories &&
                                    !requireNumberDiffrentThanZero(calories)
                                }
                                helperText={
                                    calories &&
                                        !requireNumberDiffrentThanZero(calories)
                                        ? t("home:requireNumberDiffrentThanZero")
                                        : ""
                                }
                            />
                            :
                            <></>
                    }
                    {
                        product.how_many
                            ?
                            <TextField
                                type="number"
                                label={t('How many times 100g/ml')}
                                sx={{ marginTop: '10px', width: '100%' }}
                                value={howMany}
                                onChange={(e) => setHowMany(e.target.value)}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                error={
                                    howMany &&
                                    !requiredBasicInputNumber(howMany)
                                }
                                helperText={
                                    howMany &&
                                        !requiredBasicInputNumber(howMany)
                                        ? t("home:requiredBasicInputNumber")
                                        : ""
                                }
                            />
                            :
                            <></>
                    }

                </DialogContent>
                <DialogActions>
                    <ConfirmDialog confirmed={() => {
                        deleteProduct(product._id)
                        closeDialog()
                    }}>
                        <Button sx={{ color: 'red' }}>{t('Delete')}</Button>
                    </ConfirmDialog>
                    <Button onClick={closeDialog}>{t('Deny')}</Button>
                    <Button onClick={beforeChangeProduct}>{t('Confirm')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default BaseEditProduct;