import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import useFetch from '../hooks/useFetch'
import Stack from '@mui/material/Stack';
import { useCookies } from 'react-cookie';
import styles from '../styles/Login.module.css'
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux'
import { loadToken } from '../redux/features/tokenSlice'
import useTranslation from 'next-translate/useTranslation'

const Login = () => {
    const router = useRouter()
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [cookies, setCookie] = useCookies(['token']);
    const requiredBasicInputLength = useSelector((state) => state.config.requiredBasicInputLength)

    const handleLogin = async () => {
        if(requiredBasicInputLength(login).status && requiredBasicInputLength(password).status){
            setLoading(true)
            const { response, status } = await useFetch('/auth/login', {login, password})
            if(status === 'success'){
                setCookie(
                    'token',
                    response.token,
                    {
                        path: '/',
                        expires: new Date((new Date).setFullYear((new Date).getFullYear() + 20))
                    }
                )
                setCookie(
                    'refresh_token',
                    response.refresh_token,
                    { 
                        path: '/',
                        expires: new Date((new Date).setFullYear((new Date).getFullYear() + 20))
                    }
                )
                dispatch(loadToken(response.token))
                router.push('/nutrition-diary')
            }
            setLoading(false)
        }
    }

    return (
        <div className="login">
            <div className={styles.loginBox}>
                <div/>
                <div>
                    <Stack direction="column" spacing={2}>
                        <TextField
                            label={t('login:Login')}
                            value={login}
                            variant="outlined"
                            onChange={(e) => setLogin(e.target.value)}
                            error={login.length > 0 && !requiredBasicInputLength(login).status}
                            helperText={login.length > 0 && !requiredBasicInputLength(login).status ? t('home:requiredBasicInputLength') : ''}
                        />
                        <TextField
                            label={t('login:Password')}
                            type="password"
                            value={password}
                            variant="outlined"
                            onChange={(e) => setPassword(e.target.value)}
                            error={password.length > 0 && !requiredBasicInputLength(password).status}
                            helperText={password.length > 0 && !requiredBasicInputLength(password).status ? t('home:requiredBasicInputLength') : ''}
                        />
                        <LoadingButton
                            loading={loading}
                            variant="contained"
                            onClick={handleLogin}
                        >{t('login:Sign in')}</LoadingButton>
                        <Link href="/reset-password">{t('login:Forgot password? Reset it')}</Link>
                    </Stack>
                </div>
                <div className="displayGrid">
                    <Link href="/register">
                        <LoadingButton
                            disabled={loading}
                            color="success"
                            className="marginAutoVertical"
                            variant="contained"
                        >{t('login:First time? Create account')}</LoadingButton>
                    </Link>
                </div>
            </div>
        </div>
    );
}
 
export default Login;