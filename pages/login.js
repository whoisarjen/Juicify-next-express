import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadToken } from '../redux/features/tokenSlice'
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';

const Login = () => {
    const dispatch = useDispatch()
    // const token = useSelector((state) => state.token.value)
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        console.log(login, password)
        setLoading(true)
        dispatch(loadToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGJhNzc0ZmUwZWNkNzI1ODdlZWFhMjkiLCJlbWFpbCI6IkthbWlsb3c5N0BnbWFpbC5jb20iLCJlbWFpbF9jb25maXJtYXRpb24iOnRydWUsImxvZ2luIjoiQXJqZW4iLCJzZXgiOnRydWUsInByZW1pdW0iOiIyMDIxLTEyLTAzVDE0OjA2OjMwLjcyM1oiLCJsYW5nIjoiZW4iLCJtZWFsX251bWJlciI6NSwidXNlcnNfcm9sZXNfSUQiOjk5OTksInB1YmxpY19wcm9maWxlIjoxLCJoZWlnaHQiOjE5MCwiYmlydGgiOiIxOTk3LTAxLTMxIiwiY29hY2giOiIyMDIxLTA4LTI1IiwiY29hY2hfYW5hbHl6ZSI6ZmFsc2UsImdvYWwiOjAsInJlZ2lzdGVyZWQiOiIyMDIxLTA2LTA0Iiwid2Vic2l0ZSI6ImFyamVud29ybGQucGwiLCJpbnN0YWdyYW0iOiJ3aG9pc2FyamVuIiwiZmFjZWJvb2siOiJrYW1pbC5vd2N6YXJlay4xIiwidHdpdHRlciI6Indob2lzYXJqZW4iLCJuYW1lIjoiS2FtaWwiLCJzdXJuYW1lIjoiT3djemFyZWsiLCJkZXNjcmlwdGlvbiI6IiIsIm1hY3JvbnV0cmllbnRzIjpbeyJkYXkiOjEsInByb3RlaW5zIjoxNDMsImNhcmJzIjozNjQsImZhdHMiOjc1fSx7ImRheSI6MiwicHJvdGVpbnMiOjE0MywiY2FyYnMiOjM2NCwiZmF0cyI6NzV9LHsiZGF5IjozLCJwcm90ZWlucyI6MTQzLCJjYXJicyI6MzY0LCJmYXRzIjo3NX0seyJkYXkiOjQsInByb3RlaW5zIjoxNDMsImNhcmJzIjozNjQsImZhdHMiOjc1fSx7ImRheSI6NSwicHJvdGVpbnMiOjE0MywiY2FyYnMiOjM2NCwiZmF0cyI6NzV9LHsiZGF5Ijo2LCJwcm90ZWlucyI6MTQzLCJjYXJicyI6MzY0LCJmYXRzIjo3NX0seyJkYXkiOjcsInByb3RlaW5zIjoxNDMsImNhcmJzIjozNjQsImZhdHMiOjc1fV0sImJhbm5lZCI6ZmFsc2UsImF2YXRhciI6dHJ1ZSwid2F0ZXJfYWRkZXIiOnRydWUsIndvcmtvdXRfd2F0Y2giOnRydWUsImtpbmRfb2ZfZGlldCI6MCwiYWN0aXZpdHkiOjEuMzc1LCJzcG9ydF9hY3RpdmUiOnRydWUsInJldmVyc2VfZGlldCI6ZmFsc2UsInVzZVByb3RlaW5zRyI6dHJ1ZSwicHJvdGVpbnNHIjoyMDAsInByb3RlaW5zIjoyNSwiY2FyYnMiOjQ1LCJmYXRzIjozMCwiZmliZXIiOjEwLCJzdWdhcl9wZXJjZW50IjoxMCwiaWF0IjoxNjM4NzMzNDA5LCJleHAiOjE2Mzg3MzM3MDl9.D7Q-qQ-dSrvAZeQIUuOM1bWpcaNi235GwOC9fxvmYfw'))
        setTimeout(() => setLoading(false), 1500)
    }

    return (
        <div className="login">
            <Stack direction="column" spacing={2}>
                <TextField
                    label="Login"
                    variant="outlined"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <TextField
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