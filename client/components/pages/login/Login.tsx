import Link from "next/link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import styled from 'styled-components'
import Logo from "../../common/logo";
import { useLoginProps } from "./useLogin";

const Form = styled.form`
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
`

const BaseLogin = ({ login, register, errors, handleSubmit, loading, t }: useLoginProps) => {
    return (
        <Form onSubmit={handleSubmit(login)}>
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
                    type="password"
                    variant="outlined"
                    label={t("auth:PASSWORD")}
                    {...register('password')}
                    error={typeof errors.password === 'undefined' ? false : true}
                    helperText={errors.password?.message && t(`notify:${errors.password.message || ''}`)}
                />
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    type="submit"
                    data-testid="login_button"
                >
                    {t("auth:SIGN_IN")}
                </LoadingButton>
                <Link
                    passHref
                    href="/reset-password"
                >
                    {t("auth:FORGOT_PASSWORD_RESET_IT")}
                </Link>
            </Stack>
            <Link passHref href="/register">
                <LoadingButton
                    data-testid="register_button"
                    color="success"
                    style={{ margin: 'auto 0' }}
                    variant="contained"
                >
                    {t("auth:FIRST_TIME_CREATE_ACCOUNT")}
                </LoadingButton>
            </Link>
        </Form>
    );
};

export default BaseLogin;