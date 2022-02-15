import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import useTranslation from "next-translate/useTranslation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNotify } from "../hooks/useNotify";
import { CreateUserSchema, CreateUserSchemaProps } from '../schema/user.schema'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from 'styled-components'
import Logo from "../components/common/Logo";

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

const Register = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { success } = useNotify()
    const [loading, setLoading] = useState(false)
    const [sex, setSex] = useState(1)
    const [value, setValue] = useState(new Date())

    const { register, formState: { errors }, handleSubmit } = useForm<CreateUserSchemaProps>({
        resolver: zodResolver(CreateUserSchema)
    })

    const onSubmit = async (values: CreateUserSchemaProps) => {
        try {
            setLoading(true);
            await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/auth/register`, values, { withCredentials: true });
            success('CHECK_YOUR_EMAIL')
            router.push(`/login`);
        } catch (e: any) {
            console.log(e.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
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

export default Register;
