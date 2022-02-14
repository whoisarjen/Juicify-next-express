import { useEffect, useState } from "react";
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
import styled from 'styled-components'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SettingsSchema, SettingsSchemaProps } from '../schema/user.schema'

const Box = styled.form`
    ${this} .MuiTextField-root {
        width: 100%;
        margin-bottom: 12px;
    }
    ${this} .tabTitle {
        font-size: 0.785rem;
        font-weight: bold;
        margin-bottom: 12px;
    }
`

const Settings = () => {
    const { t } = useTranslation('settings')
    const [isLoading, setIsLoading] = useState(false)
    const { changeSettings } = useSettings()
    const token: any = useAppSelector(state => state.token.value)

    const { register, formState: { errors, isDirty }, handleSubmit, reset, setValue } = useForm<SettingsSchemaProps>({
        resolver: zodResolver(SettingsSchema)
    })

    const onSubmit = async (values: SettingsSchemaProps) => {
        console.log(values)
        try {
            setIsLoading(true)
            // await changeSettings(values)
        } catch (e: any) {
            console.log(e.message)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => reset(token), [token])

    return (
        <Box onSubmit={handleSubmit(onSubmit)}>
            <div className="tabTitle">{t('Preferences')}</div>
            <SelectLanguage />
            <div className="tabTitle">{t('Diary')}</div>
            <TextField
                variant="outlined"
                label={t('Number of meals')}
                type="number"
                {...register('meal_number')}
                error={typeof errors.meal_number === 'undefined' ? false : true}
                helperText={
                    errors.meal_number?.message &&
                    errors.meal_number?.message.length &&
                    errors.meal_number?.message
                }
            />
            <TextField
                id="outlined-number"
                label={t("Fiber")}
                type="number"
                InputProps={{
                    endAdornment: <InputAdornment position="start">g / 1000 kcal</InputAdornment>
                }}
                {...register('fiber')}
                error={typeof errors.fiber === 'undefined' ? false : true}
                helperText={
                    errors.fiber?.message &&
                    errors.fiber?.message.length &&
                    errors.fiber?.message
                }
            />
            <TextField
                id="outlined-number"
                label={t("Sugar")}
                type="number"
                InputProps={{
                    endAdornment: <InputAdornment position="start">% / {t("Carbs")}</InputAdornment>
                }}
                {...register('sugar_percent')}
                error={typeof errors.sugar_percent === 'undefined' ? false : true}
                helperText={
                    errors.sugar_percent?.message &&
                    errors.sugar_percent?.message.length &&
                    errors.sugar_percent?.message
                }
            />
            <div className="tabTitle">{t('Profile')}</div>
            <TextField
                id="outlined-number"
                label={t("Name")}
                {...register('name')}
                error={typeof errors.name === 'undefined' ? false : true}
                helperText={
                    errors.name?.message &&
                    errors.name?.message.length &&
                    errors.name?.message
                }
            />
            <TextField
                label={t("Surname")}
                variant="outlined"
                {...register('surname')}
                error={typeof errors.surname === 'undefined' ? false : true}
                helperText={
                    errors.surname?.message &&
                    errors.surname?.message.length &&
                    errors.surname?.message
                }
            />
            <MobileDatePicker
                change={(newDate) => setValue('birth', newDate, { shouldDirty: true })}
                defaultDate={token.birth}
                label={t("Birth")}
            />
            <TextField
                id="outlined-number"
                label={t("Height")}
                type="number"
                InputProps={{
                    endAdornment: <InputAdornment position="start">% / {t("Carbs")}</InputAdornment>
                }}
                {...register('height')}
                error={typeof errors.height === 'undefined' ? false : true}
                helperText={
                    errors.height?.message &&
                    errors.height?.message.length &&
                    errors.height?.message
                }
            />
            <TextField
                label={t("Description")}
                variant="outlined"
                type="text"
                {...register('description')}
                error={typeof errors.description === 'undefined' ? false : true}
                helperText={
                    errors.description?.message &&
                    errors.description?.message.length &&
                    errors.description?.message
                }
            />
            <TextField
                label={t("Website")}
                variant="outlined"
                InputProps={{
                    startAdornment: <InputAdornment position="start">https://</InputAdornment>
                }}
                type="text"
                {...register('website')}
                error={typeof errors.website === 'undefined' ? false : true}
                helperText={
                    errors.website?.message &&
                    errors.website?.message.length &&
                    errors.website?.message
                }
            />
            <TextField
                label="Facebook"
                variant="outlined"
                InputProps={{
                    startAdornment: <InputAdornment position="start">https://facebook.com/</InputAdornment>
                }}
                type="text"
                {...register('facebook')}
                error={typeof errors.facebook === 'undefined' ? false : true}
                helperText={
                    errors.facebook?.message &&
                    errors.facebook?.message.length &&
                    errors.facebook?.message
                }
            />
            <TextField
                label="Instagram"
                variant="outlined"
                InputProps={{
                    startAdornment: <InputAdornment position="start">https://instagram.com/</InputAdornment>
                }}
                type="text"
                {...register('instagram')}
                error={typeof errors.instagram === 'undefined' ? false : true}
                helperText={
                    errors.instagram?.message &&
                    errors.instagram?.message.length &&
                    errors.instagram?.message
                }
            />
            <TextField
                label="Twitter"
                variant="outlined"
                InputProps={{
                    startAdornment: <InputAdornment position="start">https://twitter.com/</InputAdornment>
                }}
                type="text"
                {...register('twitter')}
                error={typeof errors.twitter === 'undefined' ? false : true}
                helperText={
                    errors.twitter?.message &&
                    errors.twitter?.message.length &&
                    errors.twitter?.message
                }
            />
            {/* <div className="tabTitle">{t('Password')}</div>
            <TextField
                label={t("New password")}
                variant="outlined"
                type="text"
                {...register('password')}
                error={typeof errors.password === 'undefined' ? false : true}
                helperText={
                    errors.password?.message &&
                    errors.password?.message.length &&
                    errors.password?.message
                }
            />
            <TextField
                label={t("Repeat new password")}
                variant="outlined"
                type="text"
                {...register('repeat')}
                error={typeof errors.repeat === 'undefined' ? false : true}
                helperText={
                    errors.repeat?.message &&
                    errors.repeat?.message.length &&
                    errors.repeat?.message
                }
            />
            <TextField
                label={t("Current password")}
                variant="outlined"
                type="text"
                {...register('current')}
                error={typeof errors.current === 'undefined' ? false : true}
                helperText={
                    errors.current?.message &&
                    errors.current?.message.length &&
                    errors.current?.message
                }
            /> */}
            <div className="tabTitle">{t('Logout')}</div>
            <Button color="error" onClick={async () => await logout()}>
                Logout
            </Button>
            {
                isDirty &&
                <BottomFlyingButton clicked={() => handleSubmit(onSubmit)} isLoading={isLoading} />
            }
        </Box>
    );
};

export default Settings;