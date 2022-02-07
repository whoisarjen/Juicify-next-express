import Link from "next/link";
import Image from 'next/image'
import { useState } from "react";
import Stack from "@mui/material/Stack";
import logo from '../../public/images/logo.png'
import styles from "../../styles/auth.module.css";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import useTranslation from "next-translate/useTranslation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNotify } from "../../hooks/useNotify";
import { remindPasswordUserSchema, RemindPasswordUserInput } from '../../schema/user.schema'

const ResetPassword = () => {
    const { t } = useTranslation('auth');
    const [{ error, success }] = useNotify()
    const [loading, setLoading] = useState(false)

    const handleKeyPress = (event: any) => {
        if (event.key === "Enter") {
            handleSubmit(onSubmit)
        }
    };

    const { register, formState: { errors }, handleSubmit } = useForm<RemindPasswordUserInput>({
        resolver: zodResolver(remindPasswordUserSchema)
    })

    const onSubmit = async (values: RemindPasswordUserInput) => {
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
        <form style={{ margin: 'auto 0' }} onSubmit={handleSubmit(onSubmit)}>
            <div className="login">
                <div className={styles.loginBox}>
                    <div className={styles.loginLogoBox}>
                        <Image alt="Juicify.app" src={logo} />
                    </div>
                    <div>
                        <Stack direction="column" spacing={2}>
                            <TextField
                                variant="outlined"
                                label={t("auth:EMAIL")}
                                type="text"
                                onKeyPress={handleKeyPress}
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
                    </div>
                    <div className="displayGrid">
                        <Link passHref href="/login">
                            <LoadingButton
                                color="success"
                                className="marginAutoVertical"
                                variant="contained"
                            >
                                {t("auth:SIGN_IN")}
                            </LoadingButton>
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ResetPassword;
