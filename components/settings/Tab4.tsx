import { FunctionComponent, useState } from "react";
import { useAppSelector } from "../../hooks/useRedux";
import styles from '../../styles/settings.module.css'
import useSettings from "../../hooks/useSettings";
import TextField from '@mui/material/TextField';
import useTranslation from "next-translate/useTranslation";
import BottomFlyingButton from '../common/BottomFlyingButton'

const Tab4: FunctionComponent<any> = ({ marginBottom }) => {
    const { t } = useTranslation()
    const [, changePassword] = useSettings()
    const [repeat, setRepeat] = useState('')
    const [current, setCurrent] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const requirePassword = useAppSelector(state => state.config.requirePassword)

    const handleSubmit = async () => {
        setIsLoading(true)
        if (
            requirePassword(password)
            && requirePassword(repeat)
            && requirePassword(current)
            && password === repeat
            && password != current
        ) {
            await changePassword({
                password,
                current
            })
                .then(() => {
                    setRepeat('')
                    setCurrent('')
                    setPassword('')
                })
        }
        setIsLoading(false)
    }

    return (
        <div className={styles.settingsTab}>
            <TextField
                id="outlined-basic"
                label="New password"
                variant="outlined"
                value={password}
                error={
                    password.length > 0 &&
                    !requirePassword(password)
                }
                helperText={
                    password.length > 0 &&
                        !requirePassword(password)
                        ? t("home:requirePassword")
                        : ""
                }
                onChange={(e) => setPassword(e.target.value)}
                sx={{ marginBottom: marginBottom }}
            />
            <TextField
                id="outlined-basic"
                label="Repeat new password"
                variant="outlined"
                value={repeat}
                error={
                    repeat.length > 0 &&
                    !requirePassword(repeat)
                }
                helperText={
                    repeat.length > 0 &&
                        !requirePassword(repeat)
                        ? t("home:requirePassword")
                        : ""
                }
                onChange={(e) => setRepeat(e.target.value)}
                sx={{ marginBottom: marginBottom }}
            />
            <TextField
                id="outlined-basic"
                label="Current password"
                variant="outlined"
                value={current}
                error={
                    current.length > 0 &&
                    !requirePassword(current)
                }
                helperText={
                    current.length > 0 &&
                        !requirePassword(current)
                        ? t("home:requirePassword")
                        : ""
                }
                onChange={(e) => setCurrent(e.target.value)}
                sx={{ marginBottom: marginBottom }}
            />
            {
                password.length > 0 &&
                <BottomFlyingButton clicked={handleSubmit} isLoading={isLoading} />
            }
        </div>
    )
}

export default Tab4;