import Link from "next/link";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import useTranslation from "next-translate/useTranslation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNotify } from "../../hooks/useNotify";
import { RemindPasswordUserSchema, RemindPasswordUserSchemaProps } from '../../schema/user.schema'
import styled from 'styled-components'
import Logo from "../../components/common/Logo";

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

const ResetPassword = () => {
    const { t } = useTranslation('auth');
    const [{ error, success }] = useNotify()
    const [loading, setLoading] = useState(false)

    const { register, formState: { errors }, handleSubmit } = useForm<RemindPasswordUserSchemaProps>({
        resolver: zodResolver(RemindPasswordUserSchema)
    })

    const onSubmit = async (values: RemindPasswordUserSchemaProps) => {
        try {
            setLoading(true);
            await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER}/auth/reset-password`,
                values,
                { withCredentials: true }
            );
            success('CHECK_YOUR_EMAIL')
        } catch (e: any) {
            error(e.message)
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
                    label={t("auth:EMAIL")}
                    type="text"
                    {...register('email')}
                    error={typeof errors.email === 'undefined' ? false : true}
                    helperText={
                        errors.email?.message &&
                        errors.email?.message.length &&
                        errors.email?.message
                    }
                />
                <LoadingButton
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

export default ResetPassword;
