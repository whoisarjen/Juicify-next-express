import { FunctionComponent, useEffect, useState } from "react";
import { logout } from '../utils/auth.utils'
import Button from '@mui/material/Button';
import BottomFlyingButton from "../components/common/BottomFlyingButton";
import useSettings from "../hooks/useSettings";
import useTranslation from "next-translate/useTranslation";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useAppSelector } from "../hooks/useRedux";
import MobileDatePicker from "../components/common/MobileDatePicker";
import SelectLanguage from "../components/common/SelectLanguage";

const Settings: FunctionComponent = () => {
    const { t } = useTranslation('settings')
    const [isLoading, setIsLoading] = useState(false)
    const [changedObject, setChangedObject] = useState<any>({})
    const [changeSettings] = useSettings()
    const token: any = useAppSelector(state => state.token.value)
    const [fiber, setFiber] = useState<number>(10)
    const [meal_number, setMeal_number] = useState<number>(5)
    const [sugar_percent, setSugar_percent] = useState<number>(5)
    const requireMealNumber = useAppSelector(state => state.config.requireMealNumber)
    const requiredBasicInputNumber0TO100 = useAppSelector(state => state.config.requiredBasicInputNumber0TO100)
    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [birth, setBirth] = useState<Date>(new Date())
    const [height, setHeight] = useState<number>(0)
    const [description, setDescription] = useState<string>('')
    const [website, setWebsite] = useState<string>('')
    const [facebook, setFacebook] = useState<string>('')
    const [instagram, setInstagram] = useState<string>('')
    const [twitter, setTwitter] = useState<string>('')
    const basicInputLength = useAppSelector(state => state.config.basicInputLength)
    const requireHeightNumber = useAppSelector(state => state.config.requireHeightNumber)
    const [repeat, setRepeat] = useState('')
    const [current, setCurrent] = useState('')
    const [password, setPassword] = useState('')
    const requirePassword = useAppSelector(state => state.config.requirePassword)

    const handleChange = (value: any, where: string) => {
        let newObject = JSON.parse(JSON.stringify(changedObject))
        eval('set' + where.charAt(0).toUpperCase() + where.slice(1) + `(${'value'})`)
        if (value != token[where] && where != 'current' && where != 'repeat') {
            newObject[where] = value
        } else {
            delete newObject[where]
        }
        if (where == 'password' && !value) { // Need special care
            delete newObject['password']
        }
        setChangedObject(newObject)
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        if (
            (changedObject['fiber'] && (changedObject['fiber'] == token.fiber || !requiredBasicInputNumber0TO100(changedObject['fiber'])))
            || (changedObject['meal_number'] && (changedObject['meal_number'] == token.meal_number || !requireMealNumber(changedObject['meal_number'])))
            || (changedObject['sugar_percent'] && (changedObject['sugar_percent'] == token.sugar_percent || !requiredBasicInputNumber0TO100(changedObject['sugar_percent'])))
            || (changedObject['birth'] && (changedObject['birth'] == token.birth))
            || (changedObject['name']) && (changedObject['name'] == token.name || !basicInputLength(changedObject['name']))
            || (changedObject['surname'] && (changedObject['surname'] == token.surname || !basicInputLength(changedObject['surname'])))
            || (changedObject['height'] && (changedObject['height'] == token.height || !requireHeightNumber(changedObject['height'])))
            || (changedObject['description'] && (changedObject['description'] == token.description || !basicInputLength(changedObject['description'])))
            || (changedObject['website'] && (changedObject['website'] == token.website || !basicInputLength(changedObject['website'])))
            || (changedObject['facebook'] && (changedObject['facebook'] == token.facebook || !basicInputLength(changedObject['facebook'])))
            || (changedObject['instagram'] && (changedObject['instagram'] == token.instagram || !basicInputLength(changedObject['instagram'])))
            || (changedObject['twitter'] && (changedObject['twitter'] == token.twitter || !basicInputLength(changedObject['twitter'])))
            || (changedObject['password']
                && (!requirePassword(changedObject['password'])
                    || !requirePassword(repeat)
                    || !requirePassword(current)
                    || changedObject['password'] !== repeat
                    || changedObject['password'] === current))
        ) {
            setIsLoading(false)
            return true;
        }
        await changeSettings({ ...changedObject, current }) // Current needs to be send just in case, user try to change password
        // setIsLoading(false)
    }

    useEffect(() => {
        if (token) {
            setChangedObject({})
            setName(token.name === undefined ? '' : token.name)
            setSurname(token.surname === undefined ? '' : token.surname)
            setBirth(token.birth === undefined ? '' : token.birth)
            setHeight(token.height === undefined ? 0 : token.height)
            setDescription(token.description === undefined ? '' : token.description)
            setWebsite(token.website === undefined ? '' : token.website)
            setFacebook(token.facebook === undefined ? '' : token.facebook)
            setInstagram(token.instagram === undefined ? '' : token.instagram)
            setTwitter(token.twitter === undefined ? '' : token.twitter)
            setFiber(token.fiber === undefined ? 10 : token.fiber)
            setMeal_number(token.meal_number === undefined ? 5 : token.meal_number)
            setSugar_percent(token.sugar_percent === undefined ? 5 : token.sugar_percent)
        }
    }, [token])

    return (
        <div className="settings">
            <div className="tabTitle">{t('Preferences')}</div>
            <SelectLanguage />
            <div className="tabTitle">{t('Diary')}</div>
            <TextField
                id="outlined-number"
                label={t('Number of meals')}
                type="number"
                value={meal_number}
                onChange={(e) => handleChange(parseInt(e.target.value), 'meal_number')}
                InputLabelProps={{
                    shrink: true,
                }}
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
                label={t("Fiber")}
                type="number"
                value={fiber}
                onChange={(e) => handleChange(parseInt(e.target.value), 'fiber')}
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    endAdornment: <InputAdornment position="start">g / 1000 kcal</InputAdornment>
                }}
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
                label={t("Sugar")}
                type="number"
                value={sugar_percent}
                onChange={(e) => handleChange(parseInt(e.target.value), 'sugar_percent')}
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    endAdornment: <InputAdornment position="start">% / {t("Carbs")}</InputAdornment>
                }}
                error={
                    !requiredBasicInputNumber0TO100(sugar_percent)
                }
                helperText={
                    !requiredBasicInputNumber0TO100(sugar_percent)
                        ? t("home:requiredBasicInputNumber0TO100")
                        : ""
                }
            />
            <div className="tabTitle">{t('Profile')}</div>
            <TextField
                id="outlined-basic"
                label={t("Name")}
                variant="outlined"
                value={name}
                onChange={(e) => handleChange(parseInt(e.target.value), 'name')}
                error={
                    (
                        name &&
                        name.length &&
                        !basicInputLength(name)
                    )
                    ||
                    false
                }
                helperText={
                    name &&
                        name.length &&
                        !basicInputLength(name)
                        ? t("home:basicInputLength")
                        : ""
                }
            />
            <TextField
                id="outlined-basic"
                label={t("Surname")}
                variant="outlined"
                value={surname}
                onChange={(e) => handleChange(parseInt(e.target.value), 'surname')}
                error={
                    (
                        surname &&
                        surname.length &&
                        !basicInputLength(surname)
                    )
                    ||
                    false
                }
                helperText={
                    surname &&
                        surname.length &&
                        !basicInputLength(surname)
                        ? t("home:basicInputLength")
                        : ""
                }
            />
            <MobileDatePicker
                change={(newDate) => setBirth(newDate)}
                defaultDate={birth}
                label={t("Birth")}
            />
            <TextField
                id="outlined-number"
                label={t("Height")}
                type="number"
                value={height}
                onChange={(e) => handleChange(parseInt(e.target.value), 'height')}
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    endAdornment: <InputAdornment position="start">cm</InputAdornment>
                }}
                error={
                    !requireHeightNumber(height)
                }
                helperText={
                    !requireHeightNumber(height)
                        ? t("home:requireHeightNumber")
                        : ""
                }
            />
            <TextField
                id="outlined-basic"
                label={t("Description")}
                variant="outlined"
                value={description}
                onChange={(e) => handleChange(parseInt(e.target.value), 'description')}
                error={
                    (
                        description &&
                        description.length &&
                        !basicInputLength(description)
                    )
                    ||
                    false
                }
                helperText={
                    description &&
                        description.length &&
                        !basicInputLength(description)
                        ? t("home:basicInputLength")
                        : ""
                }
            />
            <TextField
                id="outlined-basic"
                label={t("Website")}
                variant="outlined"
                value={website}
                onChange={(e) => handleChange(parseInt(e.target.value), 'website')}
                error={
                    (
                        website &&
                        website.length &&
                        !basicInputLength(website)
                    )
                    ||
                    false
                }
                helperText={
                    website &&
                        website.length &&
                        !basicInputLength(website)
                        ? t("home:basicInputLength")
                        : ""
                }
                InputProps={{
                    startAdornment: <InputAdornment position="start">https://</InputAdornment>
                }}
            />
            <TextField
                id="outlined-basic"
                label="Facebook"
                variant="outlined"
                value={facebook}
                onChange={(e) => handleChange(parseInt(e.target.value), 'facebook')}
                error={
                    (
                        facebook &&
                        facebook.length &&
                        !basicInputLength(facebook)
                    )
                    ||
                    false
                }
                helperText={
                    facebook &&
                        facebook.length &&
                        !basicInputLength(facebook)
                        ? t("home:basicInputLength")
                        : ""
                }
                InputProps={{
                    startAdornment: <InputAdornment position="start">https://facebook.com/</InputAdornment>
                }}
            />
            <TextField
                id="outlined-basic"
                label="Instagram"
                variant="outlined"
                value={instagram}
                onChange={(e) => handleChange(parseInt(e.target.value), 'instagram')}
                error={
                    (
                        instagram &&
                        instagram.length &&
                        !basicInputLength(instagram)
                    )
                    ||
                    false
                }
                helperText={
                    instagram &&
                        instagram.length &&
                        !basicInputLength(instagram)
                        ? t("home:basicInputLength")
                        : ""
                }
                InputProps={{
                    startAdornment: <InputAdornment position="start">https://instagram.com/</InputAdornment>
                }}
            />
            <TextField
                id="outlined-basic"
                label="Twitter"
                variant="outlined"
                value={twitter}
                onChange={(e) => handleChange(parseInt(e.target.value), 'twitter')}
                error={
                    (
                        twitter &&
                        twitter.length &&
                        !basicInputLength(twitter)
                    )
                    ||
                    false
                }
                helperText={
                    twitter &&
                        twitter.length &&
                        !basicInputLength(twitter)
                        ? t("home:basicInputLength")
                        : ""
                }
                InputProps={{
                    startAdornment: <InputAdornment position="start">https://twitter.com/</InputAdornment>
                }}
            />
            <div className="tabTitle">{t('Password')}</div>
            <TextField
                id="outlined-basic"
                label={t("New password")}
                variant="outlined"
                value={password}
                error={
                    (
                        (repeat.length || password.length) &&
                        !requirePassword(password)
                    )
                    ||
                    false
                }
                helperText={
                    (repeat.length || password.length) &&
                        !requirePassword(password)
                        ? t("home:requirePassword")
                        : ""
                }
                onChange={(e) => handleChange(e.target.value, 'password')}
            />
            <TextField
                id="outlined-basic"
                label={t("Repeat new password")}
                variant="outlined"
                value={repeat}
                error={
                    (
                        (repeat != password) ||
                        (repeat.length &&
                            !requirePassword(repeat))
                    )
                    ||
                    false
                }
                helperText={
                    (repeat != password) ||
                        (repeat.length &&
                            !requirePassword(repeat))
                        ? t("home:requirePassword")
                        : ""
                }
                onChange={(e) => handleChange(e.target.value, 'repeat')}
            />
            <TextField
                id="outlined-basic"
                label={t("Current password")}
                variant="outlined"
                value={current}
                error={
                    (
                        (current.length || repeat.length || password.length) &&
                        !requirePassword(current)
                    )
                    ||
                    false
                }
                helperText={
                    (current.length || repeat.length || password.length) &&
                        !requirePassword(current)
                        ? t("home:requirePassword")
                        : ""
                }
                onChange={(e) => handleChange(e.target.value, 'current')}
            />
            <div className="tabTitle">{t('Logout')}</div>
            <Button color="error" onClick={async () => await logout()}>
                Logout
            </Button>
            {
                Object.keys(changedObject) &&
                Object.keys(changedObject).length > 0 &&
                <BottomFlyingButton clicked={handleSubmit} isLoading={isLoading} showNumberValue={Object.keys(changedObject).length} />
            }
        </div>
    );
};

export default Settings;
