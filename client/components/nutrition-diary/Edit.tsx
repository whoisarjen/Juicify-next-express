import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { useState, useEffect, FunctionComponent } from 'react';
import { useAppSelector } from '../../hooks/useRedux';
import MenuItem from '@mui/material/MenuItem';
import ConfirmDialog from '../common/ConfirmDialog'
import useTranslation from "next-translate/useTranslation";

interface DialogEditProductProps {
    product: any,
    isDialog: boolean,
    closeDialog: () => void,
    deleteProduct: (arg0: string) => void
    changeProduct: (arg0: any) => void
}


const DialogEditProduct: FunctionComponent<DialogEditProductProps> = ({ product, isDialog, closeDialog, deleteProduct, changeProduct }) => {
    const { t } = useTranslation('nutrition-diary');
    const [meal, setMeal] = useState<any>(0)
    const [howMany, setHowMany] = useState<any>(1)
    const [calories, setCalories] = useState<any>(0)
    const [activity, setActivity] = useState<any>('')
    const token: any = useAppSelector(state => state.token.value)
    const [isDialogConfirm, setIsDialogConfirm] = useState(false)
    const requiredBasicInputNumber = useAppSelector(state => state.config.requiredBasicInputNumber)
    const requiredBasicInputLength = useAppSelector(state => state.config.requiredBasicInputLength)
    const requireNumberDiffrentThanZero = useAppSelector(state => state.config.requireNumberDiffrentThanZero)

    const beforeChangeProduct = async () => {
        let newProduct = JSON.parse(JSON.stringify(product))
        let isChanged = false
        if ((calories != product.calories) && requireNumberDiffrentThanZero(calories)) {
            newProduct.calories = calories || 1
            isChanged = true
        }
        if ((meal != product.meal) && requiredBasicInputNumber(meal)) {
            newProduct.meal = meal || 0
            isChanged = true
        }
        if ((howMany != product.how_many) && requiredBasicInputNumber(howMany)) {
            newProduct.how_many = howMany || 1
            isChanged = true
        }
        if ((activity != product.activity) && requiredBasicInputLength(activity)) {
            newProduct.activity = activity || 1
            isChanged = true
        }
        if (isChanged) {
            changeProduct(newProduct)
        }
        closeDialog()
    }

    useEffect(() => {
        setMeal(product.meal)
        setHowMany(product.how_many)
        setCalories(product.calories)
        setActivity(product.activity)
    }, [product])

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
                            (
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
                            )
                            :
                            <></>
                    }
                    {
                        product.activity
                            ?
                            (
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
                            )
                            :
                            <></>
                    }
                    {
                        product.calories
                            ?
                            (
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
                            )
                            :
                            <></>
                    }
                    {
                        product.how_many
                            ?
                            (
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
                            )
                            :
                            <></>
                    }

                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: 'red' }} onClick={() => setIsDialogConfirm(true)}>{t('Delete')}</Button>
                    <Button onClick={closeDialog}>{t('Deny')}</Button>
                    <Button onClick={beforeChangeProduct}>{t('Confirm')}</Button>
                </DialogActions>
            </Dialog>
            <ConfirmDialog
                isDialog={isDialogConfirm}
                closeDialog={() => setIsDialogConfirm(false)}
                confirm={() => {
                    deleteProduct(product._id)
                    closeDialog()
                    setIsDialogConfirm(false)
                }}
            />
        </div>
    );
}

export default DialogEditProduct;