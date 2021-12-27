import { FunctionComponent, useState, useEffect } from "react";
import { useAppSelector } from "../../hooks/useRedux";
import styles from '../../styles/settings.module.css'
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import useTranslation from "next-translate/useTranslation";
import useSettings from "../../hooks/useSettings";
import BottomFlyingButton from "../common/BottomFlyingButton";

const Tab2: FunctionComponent<any> = ({ marginBottom }) => {
    const { t } = useTranslation()
    const [changeSettings] = useSettings()
    const [fiber, setFiber] = useState<number>(10)
    const [isLoading, setIsLoading] = useState(false)
    const [meal_number, setMeal_number] = useState<number>(5)
    const [sugar_percent, setSugar_percent] = useState<number>(5)
    const [changedObject, setChangedObject] = useState<Object>({})
    const token: any = useAppSelector(state => state.token.value)
    const requireMealNumber = useAppSelector(state => state.config.requireMealNumber)
    const requiredBasicInputNumber0TO100 = useAppSelector(state => state.config.requiredBasicInputNumber0TO100)

    const handleSubmit = async () => {
        setIsLoading(true)
        if (
            requireMealNumber(meal_number)
            && requiredBasicInputNumber0TO100(fiber)
            && requiredBasicInputNumber0TO100(sugar_percent)
        ) {
            await changeSettings(changedObject)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        let object = {};
        if (fiber && fiber != token.fiber) object['fiber'] = fiber
        if (meal_number && meal_number != token.meal_number) object['meal_number'] = meal_number
        if (sugar_percent && sugar_percent != token.sugar_percent) object['sugar_percent'] = sugar_percent
        setChangedObject(object)
    }, [fiber, meal_number, sugar_percent, token])

    useEffect(() => {
        if (token) {
            setFiber(token.fiber)
            setMeal_number(token.meal_number)
            setSugar_percent(token.sugar_percent)
        }
    }, [token])

    return (
        <div className={styles.settingsTab}>
            <TextField
                id="outlined-number"
                label="Number of meals"
                type="number"
                value={meal_number}
                onChange={(e) => setMeal_number(parseInt(e.target.value))}
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{ marginBottom: marginBottom }}
                error={
                    !requireMealNumber(meal_number)
                }
                helperText={
                    !requireMealNumber(meal_number)
                        ? t("home:requireMealNumber")
                        : ""
                }
            />
            <TextField
                id="outlined-number"
                label="Fiber"
                type="number"
                value={fiber}
                onChange={(e) => setFiber(parseInt(e.target.value))}
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    endAdornment: <InputAdornment position="start">g / 1000 kcal</InputAdornment>
                }}
                sx={{ marginBottom: marginBottom }}
                error={
                    !requiredBasicInputNumber0TO100(fiber)
                }
                helperText={
                    !requiredBasicInputNumber0TO100(fiber)
                        ? t("home:requiredBasicInputNumber0TO100")
                        : ""
                }
            />
            <TextField
                id="outlined-number"
                label="Sugar"
                type="number"
                value={sugar_percent}
                onChange={(e) => setSugar_percent(parseInt(e.target.value))}
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    endAdornment: <InputAdornment position="start">% / kcal</InputAdornment>
                }}
                sx={{ marginBottom: marginBottom }}
                error={
                    !requiredBasicInputNumber0TO100(sugar_percent)
                }
                helperText={
                    !requiredBasicInputNumber0TO100(sugar_percent)
                        ? t("home:requiredBasicInputNumber0TO100")
                        : ""
                }
            />
            {
                Object.keys(changedObject).length > 0 &&
                <BottomFlyingButton clicked={handleSubmit} isLoading={isLoading} showNumberValue={Object.keys(changedObject).length} />
            }
        </div>
    )
}

export default Tab2;