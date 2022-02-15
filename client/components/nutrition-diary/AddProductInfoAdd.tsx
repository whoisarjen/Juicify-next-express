import { forwardRef, useState } from "react";
import Button from '@mui/material/Button';
import useTranslation from "next-translate/useTranslation";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useAppSelector } from "../../hooks/useRedux";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNotify } from "../../hooks/useNotify";
import { insertThoseIDStoDBController } from "../../utils/db.utils";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface DiagramsOptionsProps {
    isAdd: boolean,
    setIsAdd: (arg0: boolean) => void,
    dailyMeasurement: any,
    defaultMeal?: number,
    loadedProduct: any
}

const DiagramsOptions = ({ isAdd, setIsAdd, dailyMeasurement, defaultMeal = 0, loadedProduct }: DiagramsOptionsProps) => {
    const { t } = useTranslation('nutrition-diary')
    const [meal, setMeal] = useState(defaultMeal)
    const [howMany, setHowMany] = useState('1')
    const token: any = useAppSelector(state => state.token.value)
    const { success } = useNotify()

    const addNewProduct = async () => {
        if (parseFloat(howMany) > 0) {
            let object: any = { ...dailyMeasurement }
            object.nutrition_diary.push({
                ...loadedProduct,
                "_id": 'XD' + new Date().getTime(),
                "meal": meal,
                "how_many": howMany,
                "product_ID": loadedProduct._id
            })
            await insertThoseIDStoDBController('daily_measurement', [object])
        }
        setIsAdd(false)
        success()
    }

    return (
        <Dialog
            open={isAdd}
            TransitionComponent={Transition}
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

export default DiagramsOptions;