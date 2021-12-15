import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import ConfirmDialog from '../common/ConfirmDialog'
import useTranslation from "next-translate/useTranslation";


const DialogEditProduct = ({ product, isDialog, closeDialog, deleteProduct, changeProduct }) => {
    const { t } = useTranslation('nutrition-diary');
    const [meal, setMeal] = useState(0)
    const [howMany, setHowMany] = useState(1)
    const [isDialogConfirm, setIsDialogConfirm] = useState(false)
    const token = useSelector(state => state.token.value)

    const beforeChangeProduct = async () => {
        if (meal != product.meal || howMany != product.how_many) {
            let newProduct = JSON.parse(JSON.stringify(product))
            newProduct.meal = meal
            newProduct.how_many = howMany
            changeProduct(newProduct)
        }
        closeDialog()
    }

    useEffect(() => {
        setMeal(product.meal)
        setHowMany(product.how_many)
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
                    <Select
                        sx={{ marginBottom: '10px', width: '100%' }}
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
                    <TextField type="number" label={t('How Many times 100g/ml')} sx={{ width: '100%' }} value={howMany} onChange={(e) => setHowMany(e.target.value)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
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