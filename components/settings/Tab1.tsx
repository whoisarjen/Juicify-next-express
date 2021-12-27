import { FunctionComponent, useState } from "react";
import TextField from '@mui/material/TextField';
import { useAppSelector } from "../../hooks/useRedux";
import styles from '../../styles/settings.module.css'
import BottomFlyingButton from "../common/BottomFlyingButton";

const Tab1: FunctionComponent = () => {
    const [isLoading, setIsLoading] = useState(false)
    const token: any = useAppSelector(state => state.token.value)

    const handleSubmit = async () => {}

    return (
        <div className={styles.settingsTab}>
            <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                sx={{
                    marginBottom: '12px'
                }}
            />
            <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                sx={{
                    marginBottom: '12px'
                }}
            />
            <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                sx={{
                    marginBottom: '12px'
                }}
            />
            <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                sx={{
                    marginBottom: '12px'
                }}
            />
            <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                sx={{
                    marginBottom: '12px'
                }}
            />
            <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                sx={{
                    marginBottom: '12px'
                }}
            />
            <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                sx={{
                    marginBottom: '12px'
                }}
            />
            <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                sx={{
                    marginBottom: '12px'
                }}
            />
            <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                sx={{
                    marginBottom: '12px'
                }}
            />
            <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                sx={{
                    marginBottom: '12px'
                }}
            />

            <BottomFlyingButton clicked={handleSubmit} isLoading={isLoading} />
        </div>
    )
}

export default Tab1;