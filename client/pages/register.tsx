import Link from "next/link";
import Image from 'next/image'
import { useState } from "react";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import logo from '../public/images/logo.png'
import styles from "../styles/auth.module.css";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import useTranslation from "next-translate/useTranslation";
import { expectLoggedOUT } from "../utils/checkAuth";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNotify } from "../hooks/useNotify";
import { createUserSchema, CreateUserInput } from '../schema/user.schema'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import config from "../config/default";

const Register = () => {
    expectLoggedOUT();
    const router = useRouter();
    const { t } = useTranslation();
    const [{ error, success }] = useNotify()
    const [loading, setLoading] = useState(false)
    const [sex, setSex] = useState(1)
    const [value, setValue] = useState(new Date())

    const handleKeyPress = (event: any) => {
        if (event.key === "Enter") {
            handleSubmit(onSubmit)
        }
    };

    const { register, formState: { errors }, handleSubmit } = useForm<CreateUserInput>({
        resolver: zodResolver(createUserSchema)
    })

    const onSubmit = async (values: CreateUserInput) => {
        try {
            setLoading(true);
            await axios.post(
                `${config.server}/auth/register`,
                values,
                { withCredentials: true }
            );
            success('CHECK_YOUR_EMAIL')
            router.push(`/login`);
        } catch (e: any) {
            error(e.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <form style={{ margin: 'auto 0' }} onSubmit={handleSubmit(onSubmit)}>
            <div className="register">
                <div className={styles.registerBox}>
                    <div className={styles.registerLogoBox}>
                        <Image alt="Juicify.app" src={logo} />
                    </div>
                    <div>
                        <Stack direction="column" spacing={2}>
                            <TextField
                                variant="outlined"
                                label={t("auth:LOGIN")}
                                type="text"
                                onKeyPress={handleKeyPress}
                                {...register('login')}
                                error={typeof errors.login === 'undefined' ? false : true}
                                helperText={
                                    errors.login?.message &&
                                    errors.login?.message.length &&
                                    errors.login?.message
                                }
                            />
                            <TextField
                                type="email"
                                variant="outlined"
                                label={t("auth:EMAIL")}
                                onKeyPress={handleKeyPress}
                                {...register('email')}
                                error={typeof errors.email === 'undefined' ? false : true}
                                helperText={
                                    errors.email?.message &&
                                    errors.email?.message.length &&
                                    errors.email?.message
                                }
                            />
                            <TextField
                                type="password"
                                variant="outlined"
                                label={t("auth:PASSWORD")}
                                onKeyPress={handleKeyPress}
                                {...register('password')}
                                error={typeof errors.password === 'undefined' ? false : true}
                                helperText={
                                    errors.password?.message &&
                                    errors.password?.message.length &&
                                    errors.password?.message
                                }
                            />
                            <TextField
                                type="password"
                                variant="outlined"
                                label={t("auth:PASSWORD_CONFIRMATION")}
                                onKeyPress={handleKeyPress}
                                {...register('passwordConfirmation')}
                                error={typeof errors.passwordConfirmation === 'undefined' ? false : true}
                                helperText={
                                    errors.passwordConfirmation?.message &&
                                    errors.passwordConfirmation?.message.length &&
                                    errors.passwordConfirmation?.message
                                }
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    {...register('birth')}
                                    label={t("auth:BIRTH")}
                                    value={value}
                                    onChange={(newValue: any) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params: any) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <TextField
                                type="Number"
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                variant="outlined"
                                label={t("auth:HEIGHT")}
                                onKeyPress={handleKeyPress}
                                {...register('height')}
                                error={typeof errors.height === 'undefined' ? false : true}
                                helperText={
                                    errors.height?.message &&
                                    errors.height?.message.length &&
                                    errors.height?.message
                                }
                            />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">{t("auth:SEX")}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sex}
                                    {...register('sex')}
                                    label={t("auth:SEX")}
                                    onChange={(e) => setSex(parseInt(e.target.value.toString()))}
                                >
                                    <MenuItem value={0}>{t("auth:WOMAN")}</MenuItem>
                                    <MenuItem value={1}>{t("auth:MAN")}</MenuItem>
                                </Select>
                            </FormControl>
                            <LoadingButton
                                loading={loading}
                                variant="contained"
                                type="submit"
                            >
                                {t("auth:REGISTER")}
                            </LoadingButton>
                        </Stack>
                    </div>
                    <div className="displayGrid">
                        <Link passHref href="/login">
                            <LoadingButton
                                color="success"
                                className="marginAutoVertical"
                                variant="contained"
                            >
                                {t("auth:ONE_OF_US_SIGN_IN")}
                            </LoadingButton>
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Register;
