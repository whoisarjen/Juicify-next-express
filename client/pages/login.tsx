import Link from "next/link";
import Image from 'next/image'
import { useState } from "react";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import logo from '../public/images/logo.png'
import styles from "../styles/auth.module.css";
import TextField from "@mui/material/TextField";
import { setLastUpdated } from '../utils/API'
import LoadingButton from "@mui/lab/LoadingButton";
import { useAppDispatch } from "../hooks/useRedux";
import { setToken } from "../redux/features/tokenSlice";
import useTranslation from "next-translate/useTranslation";
import { expectLoggedOUT, readToken } from "../utils/checkAuth";
import { createIndexedDB, addIndexedDB } from "../utils/indexedDB";
import { getShortDate } from "../utils/manageDate";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNotify } from "../hooks/useNotify";
import { createSessionSchema, CreateSessionProps } from '../schema/session.schema'

const Login = () => {
    expectLoggedOUT();
    const router = useRouter();
    const { t } = useTranslation();
    const [{ error }] = useNotify()
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false)

    const handleKeyPress = (event: any) => {
        if (event.key === "Enter") {
            handleSubmit(onSubmit)
        }
    };

    const { register, formState: { errors }, handleSubmit } = useForm<CreateSessionProps>({
        resolver: zodResolver(createSessionSchema)
    })

    const onSubmit = async (values: CreateSessionProps) => {
        try {
            setLoading(true);
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/auth/login`,
                values,
                { withCredentials: true }
            );
            dispatch(setToken(response.data.token));
            await createIndexedDB()
            const keys = Object.keys(response.data)
            for (let i = 0; i < keys.length; i++) {
                if (keys[i] != 'token' && keys[i] != 'refresh_token') {
                    await addIndexedDB(keys[i], response.data[keys[i]])
                }
            }
            setLastUpdated();
            router.push(
                `/${readToken(response.data.token).login
                }/nutrition-diary/${getShortDate()}`
            );
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
                            <LoadingButton
                                loading={loading}
                                variant="contained"
                                type="submit"
                            >
                                {t("auth:SIGN_IN")}
                            </LoadingButton>
                            <Link passHref href="/reset-password">
                                {t("auth:FORGOT_PASSWORD_RESET_IT")}
                            </Link>
                        </Stack>
                    </div>
                    <div className="displayGrid">
                        <Link passHref href="/register">
                            <LoadingButton
                                color="success"
                                className="marginAutoVertical"
                                variant="contained"
                            >
                                {t("auth:FIRST_TIME_CREATE_ACCOUNT")}
                            </LoadingButton>
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Login;
