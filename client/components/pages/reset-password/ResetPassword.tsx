import Link from "next/link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import styled from 'styled-components'
import Logo from "../../common/logo";
import { useResetPasswordProps } from "./useResetPassword";

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
`

const BaseResetPassword = ({ t, handleSubmit, onSubmit, errors, loading, register }: useResetPasswordProps) => {
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <LogoWrapper>
                <Logo size={180} />
            </LogoWrapper>
            <Stack direction="column" spacing={2}>
                <TextField
                    variant="outlined"
                    label={t("auth:EMAIL")}
                    type="text"
                    {...register('email')}
                    error={typeof errors.email === 'undefined' ? false : true}
                    helperText={errors.email?.message && t(`notify:${errors.email.message || ''}`)}
                />
                <LoadingButton
                    onClick={handleSubmit(onSubmit)}
                    loading={loading}
                    variant="contained"
                    type="submit"
                >
                    {t("auth:CONFIRM")}
                </LoadingButton>
            </Stack>
            <Link passHref href="/login">
                <LoadingButton
                    color="success"
                    style={{ margin: 'auto 0' }}
                    variant="contained"
                >
                    {t("auth:SIGN_IN")}
                </LoadingButton>
            </Link>
        </Form>
    );
};

export default BaseResetPassword;
