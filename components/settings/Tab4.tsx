import { FunctionComponent, useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useRedux";
import TextField from '@mui/material/TextField';
import useTranslation from "next-translate/useTranslation";

const Tab4: FunctionComponent<any> = ({ changeObject }) => {
    const { t } = useTranslation('settings')
    const [repeat, setRepeat] = useState('')
    const [current, setCurrent] = useState('')
    const [password, setPassword] = useState('')
    const token: any = useAppSelector(state => state.token.value)
    const requirePassword = useAppSelector(state => state.config.requirePassword)

    useEffect(() => {
        let object: any = {};
        if (requirePassword(password)
            && requirePassword(repeat)
            && requirePassword(current)
            && password === repeat
            && password != current
        ) {
            object.current = current
            object.password = password

        }
        changeObject(object)
    }, [password, repeat, current, token])

    return (
        <div>
            <TextField
                id="outlined-basic"
                label={t("New password")}
                variant="outlined"
                value={password}
                error={
                    (repeat.length || password.length) &&
                    !requirePassword(password)
                }
                helperText={
                    (repeat.length || password.length) &&
                        !requirePassword(password)
                        ? t("home:requirePassword")
                        : ""
                }
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                id="outlined-basic"
                label={t("Repeat new password")}
                variant="outlined"
                value={repeat}
                error={
                    (repeat != password) ||
                    (repeat.length &&
                        !requirePassword(repeat))
                }
                helperText={
                    (repeat != password) ||
                        (repeat.length &&
                            !requirePassword(repeat))
                        ? t("home:requirePassword")
                        : ""
                }
                onChange={(e) => setRepeat(e.target.value)}
            />
            <TextField
                id="outlined-basic"
                label={t("Current password")}
                variant="outlined"
                value={current}
                error={
                    (current.length || repeat.length || password.length) &&
                    !requirePassword(current)
                }
                helperText={
                    (current.length || repeat.length || password.length) &&
                        !requirePassword(current)
                        ? t("home:requirePassword")
                        : ""
                }
                onChange={(e) => setCurrent(e.target.value)}
            />
        </div>
    )
}

export default Tab4;