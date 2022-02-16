import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useInformationsAddProps } from "./useInformationsAdd";
import SlideUp from "../../../../../transition/SlideUp";

const InformationsAdd = ({ isAdd, setIsAdd, meal, setMeal, token, howMany, setHowMany, addNewProduct, t }: useInformationsAddProps) => {
    return (
        <Dialog
            open={isAdd}
            TransitionComponent={SlideUp}
            keepMounted
            onClose={() => setIsAdd(false)}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{t('ADD_TO_DIARY')}</DialogTitle>
            <DialogContent>
                <Select
                    sx={{ marginBottom: '10px' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={meal}
                    fullWidth
                    onChange={(e) => setMeal(parseInt(e.target.value.toString()))}
                >
                    {
                        [...Array(token.meal_number)].map((x, i) =>
                            <MenuItem key={i} value={i}>{t('Meal')} {i + 1}</MenuItem>
                        )
                    }
                </Select>
                <TextField
                    value={howMany}
                    onChange={(e) => setHowMany(e.target.value)}
                    id="outlined-basic"
                    label={t('How many times 100g/ml')}
                    variant="outlined"
                    fullWidth
                    sx={{ marginTop: '12px' }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">x 100g/ml</InputAdornment>,
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsAdd(false)}>{t('Deny')}</Button>
                <Button onClick={addNewProduct}>{t('Confirm')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default InformationsAdd;