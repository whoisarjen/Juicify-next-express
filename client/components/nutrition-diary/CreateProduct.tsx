import { useState, useEffect, FunctionComponent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useTranslation from 'next-translate/useTranslation';
import { useAppSelector } from "../../hooks/useRedux";
import { insertThoseIDStoDB } from '../../utils/API';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNotify } from '../../hooks/useNotify';
import NutritionDiary from '../../classes/nutritionDiary';

interface CreateProductProps {
    closeCreateProduct: () => void,
    isCreateProduct: boolean,
    created: (arg0: string) => void
    defaultBarcode?: string | number
}

const CreateProduct: FunctionComponent<CreateProductProps> = ({ closeCreateProduct, isCreateProduct, created, defaultBarcode }) => {
    const { t } = useTranslation('nutrition-diary')
    const [code, setCode] = useState(defaultBarcode)
    const [availableForAll, setAvailableForAll] = useState(false)
    const [loading, setLoading] = useState(false)
    const [proteins, setProteins] = useState<any>('')
    const [carbs, setCarbs] = useState<any>('')
    const [sugar, setSugar] = useState<any>('')
    const [fat, setFat] = useState<any>('')
    const [fiber, setFiber] = useState<any>('')
    const [salt, setSalt] = useState<any>('')
    const [ethanol, setEthanol] = useState<any>('')
    const [calories, setCalories] = useState(0)
    const [name, setName] = useState('')
    const numberOnlyPositive = useAppSelector(state => state.config.numberOnlyPositive)
    const numberOnlyPositiveLong = useAppSelector(state => state.config.numberOnlyPositiveLong)
    const token: any = useAppSelector(state => state.token.value)
    const requiredBasicInputLength = useAppSelector(state => state.config.requiredBasicInputLength)
    const [{ success, error }] = useNotify()

    const handleCreateProduct = async () => {
        if (
            numberOnlyPositive(proteins) &&
            numberOnlyPositive(carbs) &&
            numberOnlyPositive(sugar) &&
            numberOnlyPositive(fat) &&
            numberOnlyPositive(fiber) &&
            numberOnlyPositive(salt) &&
            numberOnlyPositive(ethanol) &&
            numberOnlyPositive(calories) &&
            requiredBasicInputLength(name)
        ) {
            if (calories > 0) {
                setLoading(true)
                let object = new NutritionDiary(
                    {
                        _id: 'XD' + new Date().getTime(),
                        name: name,
                        l: name.length,
                        user_ID: token._id
                    }
                )
                if (proteins && parseFloat(proteins) > 0) {
                    object.p = proteins
                }
                if (carbs && parseFloat(carbs) > 0) {
                    object.c = carbs
                }
                if (sugar && parseFloat(sugar) > 0) {
                    object.s = sugar
                }
                if (fat && parseFloat(fat) > 0) {
                    object.f = fat
                }
                if (fiber && parseFloat(fiber) > 0) {
                    object.fi = fiber
                }
                if (salt && parseFloat(salt) > 0) {
                    object.na = salt
                }
                if (ethanol && parseFloat(ethanol) > 0) {
                    object.ethanol = ethanol
                }
                if (code) {
                    object.code = parseInt(code.toString())
                }
                if (availableForAll) {
                    object.checkMe = true
                }
                await insertThoseIDStoDB('product', [object])
                    .then(() => created(name))
                    .then(() => success())
                    .then(() => {
                        setCode(defaultBarcode)
                        setAvailableForAll(false)
                        setLoading(false)
                        setProteins('')
                        setCarbs('')
                        setSugar('')
                        setFat('')
                        setFiber('')
                        setSalt('')
                        setEthanol('')
                        setCalories(0)
                        setName('')
                    })
                    .finally(() => setLoading(false))
            } else {
                error('Calories can NOT be equal to zero')
            }
        }
    }

    useEffect(() => {
        let count = 0
        if (proteins) {
            count += proteins * 4
        }
        if (carbs) {
            count += carbs * 4
        }
        if (fat) {
            count += fat * 9
        }
        if (ethanol) {
            count += ethanol * 7
        }
        setCalories(count)
    }, [proteins, carbs, fat, ethanol])

    return (
        <div>
            <Dialog open={isCreateProduct}>
                <DialogTitle>{t('Create product')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('Create product description')}
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
                        label={t('Name of product')}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    {
                        defaultBarcode &&
                        <TextField
                            error={
                                !numberOnlyPositiveLong(code)
                            }
                            helperText={
                                !numberOnlyPositiveLong(code)
                                    ? t("home:numberOnlyPositiveLong")
                                    : ""
                            }
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
                        error={
                            !numberOnlyPositive(proteins)
                        }
                        helperText={
                            !numberOnlyPositive(proteins)
                                ? t("home:requiredBasicInputNumber")
                                : ""
                        }
                        margin="dense"
                        id="name"
                        label={t('Proteins in 100g/ml')}
                        value={proteins}
                        onChange={(e) => setProteins(e.target.value)}
                        type="Number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        error={
                            !numberOnlyPositive(carbs)
                        }
                        helperText={
                            !numberOnlyPositive(carbs)
                                ? t("home:requiredBasicInputNumber")
                                : ""
                        }
                        margin="dense"
                        id="name"
                        label={t('Carbs in 100g/ml')}
                        value={carbs}
                        onChange={(e) => setCarbs(e.target.value)}
                        type="Number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        error={
                            !numberOnlyPositive(sugar)
                        }
                        helperText={
                            !numberOnlyPositive(sugar)
                                ? t("home:requiredBasicInputNumber")
                                : ""
                        }
                        margin="dense"
                        id="name"
                        label={t('Sugar in 100g/ml')}
                        value={sugar}
                        onChange={(e) => setSugar(e.target.value)}
                        type="Number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        error={
                            !numberOnlyPositive(fat)
                        }
                        helperText={
                            !numberOnlyPositive(fat)
                                ? t("home:requiredBasicInputNumber")
                                : ""
                        }
                        margin="dense"
                        id="name"
                        label={t('Fat in 100g/ml')}
                        value={fat}
                        onChange={(e) => setFat(e.target.value)}
                        type="Number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        error={
                            !numberOnlyPositive(fiber)
                        }
                        helperText={
                            !numberOnlyPositive(fiber)
                                ? t("home:requiredBasicInputNumber")
                                : ""
                        }
                        margin="dense"
                        id="name"
                        label={t('Fiber in 100g/ml')}
                        value={fiber}
                        onChange={(e) => setFiber(e.target.value)}
                        type="Number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        error={
                            !numberOnlyPositive(salt)
                        }
                        helperText={
                            !numberOnlyPositive(salt)
                                ? t("home:requiredBasicInputNumber")
                                : ""
                        }
                        margin="dense"
                        id="name"
                        label={t('Salt in 100g/ml')}
                        value={salt}
                        onChange={(e) => setSalt(e.target.value)}
                        type="Number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        error={
                            !numberOnlyPositive(ethanol)
                        }
                        helperText={
                            !numberOnlyPositive(ethanol)
                                ? t("home:requiredBasicInputNumber")
                                : ""
                        }
                        margin="dense"
                        id="name"
                        label={t('Ethanol in 100g/ml')}
                        value={ethanol}
                        onChange={(e) => setEthanol(e.target.value)}
                        type="Number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        disabled
                        label={t('Calories in 100g/ml')}
                        value={calories}
                        type="Number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        fullWidth
                        variant="standard"
                    />
                    <FormControlLabel control={<Switch value={availableForAll} onChange={() => setAvailableForAll(state => !state)} />} label={t('Should be available for all?')} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeCreateProduct}>{t('Cancel')}</Button>
                    <LoadingButton loading={loading} onClick={handleCreateProduct}>
                        {t('Submit')}
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CreateProduct;