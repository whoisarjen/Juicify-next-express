import { useState } from 'react'
import { useSelector } from 'react-redux'
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import useTranslation from 'next-translate/useTranslation'
import '../styles/Login.module.css'

const Login = () => {
    const serverAdress = useSelector((state) => state.config.serverAdress)
    const { t } = useTranslation()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const requiredBasicInputLength = useSelector((state) => state.config.requiredBasicInputLength)

    const handleLogin = async () => {
        if(requiredBasicInputLength(login).status && requiredBasicInputLength(password).status){
            setLoading(true)
            console.log("Signing in...")
            console.log(serverAdress)
            // TO THE HOOOOOOOOK!

            fetch(`${serverAdress}/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({a: 7, str: 'Some string: &=&'})
            })
                .then(res => res.json())
                .then(res => console.log(res));
            //     .catch(() => {
            //         setNotificationMessage('Account does NOT exists!!')
            //         setOpenNotification(true)
            //     })
            setTimeout(() => setLoading(false), 1500)
        }
    }

    return (
        <div className="login marginAutoVertical">
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
            </Stack>
        </div>
    );
}
 
export default Login;