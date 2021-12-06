import { useState } from 'react'
import { useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';

const Login = () => {
    // const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errorLogin, setLoginError] = useState(false)
    const [errorPassword, setPasswordError] = useState(false)

    const handleLogin = async () => {
        setLoginError(false)
        setPasswordError(false)

        if(login.length < 3) setLoginError(true)
        else if(password.length < 3) setPasswordError(true)
        else{

            // TO THE HOOOOOOOOK!

            // setLoading(true)
            // fetch('https://jsonplaceholder.typicode.com/todos/1')
            //     .then(response => response.json())
            //     .then(json => console.log(json))
            //     .catch(() => {
            //         setNotificationMessage('Account does NOT exists!!')
            //         setOpenNotification(true)
            //     })
            //     .finally(() => setLoading(false))
        }
    }

    return (
        <div className="login">
            <Stack direction="column" spacing={2}>
                <TextField
                    error={errorLogin}
                    helperText={errorLogin ? 'Expect at least 3 letters!' : ''}
                    label="Login"
                    variant="outlined"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <TextField
                    error={errorPassword}
                    helperText={errorPassword ? 'Expect at least 3 letters!' : ''}
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <LoadingButton
                    variant="contained"
                    loading={loading}
                    onClick={handleLogin}
                >Sign in</LoadingButton>
            </Stack>
        </div>
    );
}
 
export default Login;