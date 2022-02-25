import Link from "next/link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components'
import Logo from "../../common/logo";
import { useRegisterProps } from "./useRegister";
import DialogRules from "../../common/dialog-rules";

const Form = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 1fr auto 1fr;
    a{
        text-align: center;
    }
`
const LogoWrapper = styled.div`
    margin: auto;
    padding: 10px;
    max-width: 180px;
    display: grid;
`

const BaseRegister = ({ registerUser, t, loading, register, errors, handleSubmit, date, setDate, setValue }: useRegisterProps) => {
    return (
        <Form onSubmit={handleSubmit(registerUser)}>
            <LogoWrapper>
                <Logo size={180} />
            </LogoWrapper>
            <Stack direction="column" spacing={2}>
                <TextField
                    variant="outlined"
                    label={t("auth:LOGIN")}
                    type="text"
                    {...register('login')}
                    error={typeof errors.login === 'undefined' ? false : true}
                    helperText={errors.login?.message && t(`notify:${errors.login.message || ''}`)}
                />
                <TextField
                    type="email"
                    variant="outlined"
                    label={t("auth:EMAIL")}
                    {...register('email')}
                    error={typeof errors.email === 'undefined' ? false : true}
                    helperText={errors.email?.message && t(`notify:${errors.email.message || ''}`)}
                />
                <TextField
                    type="password"
                    variant="outlined"
                    label={t("auth:PASSWORD")}
                    {...register('password')}
                    data-testid="password"
                    error={typeof errors.password === 'undefined' ? false : true}
                    helperText={errors.password?.message && t(`notify:${errors.password.message || ''}`)}
                />
                <TextField
                    type="password"
                    variant="outlined"
                    label={t("auth:PASSWORD_CONFIRMATION")}
                    {...register('passwordConfirmation')}
                    data-testid="confirmation"
                    error={typeof errors.passwordConfirmation === 'undefined' ? false : true}
                    helperText={errors.passwordConfirmation?.message && t(`notify:${errors.passwordConfirmation.message || ''}`)}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        {...register('birth')}
                        label={t("auth:BIRTH")}
                        value={date}
                        onChange={(newValue: any) => {
                            setDate(newValue);
                            setValue('birth', newValue)
                        }}
                        renderInput={(params: any) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <TextField
                    type="Number"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    variant="outlined"
                    label={t("auth:HEIGHT")}
                    {...register('height')}
                    error={typeof errors.height === 'undefined' ? false : true}
                    helperText={errors.height?.message && t(`notify:${errors.height.message || ''}`)}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{t("auth:SEX")}</InputLabel>
                    <Select
                        {...register('sex')}
                        label={t("auth:SEX")}
                        defaultValue="true"
                        data-testid="sex"
                    >
                        <MenuItem value="true">{t("auth:MAN")}</MenuItem>
                        <MenuItem value="false">{t("auth:WOMAN")}</MenuItem>
                    </Select>
                </FormControl>
                <DialogRules>
                    <FormControlLabel
                        control={
                            <Checkbox
                                {...register('rules')}
                            />
                        }
                        label={t('auth:I_AM_ACCEPTING_RULES')}
                    />
                </DialogRules>
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit(registerUser)}
                >
                    {t("auth:REGISTER")}
                </LoadingButton>
            </Stack>
            <Link passHref href="/login">
                <LoadingButton
                    color="success"
                    style={{ margin: 'auto 0' }}
                    variant="contained"
                >
                    {t("auth:ONE_OF_US_SIGN_IN")}
                </LoadingButton>
            </Link>
        </Form>
    );
};

export default BaseRegister;
