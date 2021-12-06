import { useState } from 'react'
import { useSelector } from 'react-redux'
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import useTranslation from 'next-translate/useTranslation'

const Login = () => {
    const { t } = useTranslation('login')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const requiredBasicInputLength = useSelector((state) => state.config.requiredBasicInputLength)

    const handleLogin = async () => {
        if(requiredBasicInputLength(login).status && requiredBasicInputLength(password).status){
            setLoading(true)
            console.log("Signing in...")
            // TO THE HOOOOOOOOK!

            // setLoading(true)
            // fetch('https://jsonplaceholder.typicode.com/todos/1')
            //     .then(response => response.json())
            //     .then(json => console.log(json))
            //     .catch(() => {
            //         setNotificationMessage('Account does NOT exists!!')
            //         setOpenNotification(true)
            //     })
            setLoading(false)
        }
    }

    return (
        <div className="login">
            <Stack direction="column" spacing={2}>
                <TextField
                    label={t('Login')}
                    value={login}
                    variant="outlined"
                    onChange={(e) => setLogin(e.target.value)}
                    error={login.length > 0 && !requiredBasicInputLength(login).status}
                    helperText={login.length > 0 && !requiredBasicInputLength(login).status ? requiredBasicInputLength(login).message : ''}
                />
                <TextField
                    label={t('Password')}
                    type="password"
                    value={password}
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                    error={password.length > 0 && !requiredBasicInputLength(password).status}
                    helperText={password.length > 0 && !requiredBasicInputLength(password).status ? requiredBasicInputLength(password).message : ''}
                />
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    onClick={handleLogin}
                >{t('Sign in')}</LoadingButton>
            </Stack>
        </div>
    );
}
 
export default Login;