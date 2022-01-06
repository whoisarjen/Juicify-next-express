import { FunctionComponent, forwardRef, Ref, ReactElement, useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ConfirmDialog from "../common/ConfirmDialog";
import useSettings from '../../hooks/useSettings'
import { useAppSelector } from "../../hooks/useRedux";
import useTranslation from "next-translate/useTranslation";

interface OwnMacroProps {
    isOwnMacro: boolean,
    close: () => void
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const OwnMacro: FunctionComponent<OwnMacroProps> = ({ isOwnMacro, close }) => {
    const token: any = useAppSelector(state => state.token.value)
    const [isDialog, setIsDialog] = useState(false)
    const [proteins, setProteins] = useState(0)
    const [carbs, setCarbs] = useState(0)
    const [fats, setFats] = useState(0)
    const [changeSettings] = useSettings()
    const { t } = useTranslation('macronutrients')

    const handleConfirm = async () => {
        setIsDialog(false)
        let macronutrients = []
        for (let i = 1; i < 8; i++) {
            macronutrients.push({
                proteins,
                carbs,
                fats,
                day: i
            })
        }
        await changeSettings({ macronutrients })
        close()
    }

    useEffect(() => {
        if (token && Object.keys(token).length) {
            setProteins(token.macronutrients[0].proteins)
            setCarbs(token.macronutrients[0].carbs)
            setFats(token.macronutrients[0].fats)
        }
    }, [token])

    return (
        <div>
            <Dialog
                open={isOwnMacro}
                TransitionComponent={Transition}
                keepMounted
                onClose={close}
            >
                <DialogTitle>{"Use own macro"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {t('OWN_MACRO_DESCRIPTION')}
                    </DialogContentText>
                    <TextField
                        fullWidth
                        sx={{ marginTop: '5px' }}
                        id="outlined-basic"
                        label={t('PROTEINS')}
                        value={proteins}
                        onChange={(e) => setProteins(parseInt(e.target.value.toString()))}
                        variant="outlined"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">g/day</InputAdornment>,
                        }}
                    />
                    <TextField
                        fullWidth
                        sx={{ marginTop: '5px' }}
                        id="outlined-basic"
                        label={t('CARBS')}
                        value={carbs}
                        onChange={(e) => setCarbs(parseInt(e.target.value.toString()))}
                        variant="outlined"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">g/day</InputAdornment>,
                        }}
                    />
                    <TextField
                        fullWidth
                        sx={{ marginTop: '5px' }}
                        id="outlined-basic"
                        label={t('FATS')}
                        value={fats}
                        onChange={(e) => setFats(parseInt(e.target.value.toString()))}
                        variant="outlined"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">g/day</InputAdornment>,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={close}>Close</Button>
                    <Button onClick={() => setIsDialog(true)}>Change all days</Button>
                </DialogActions>
            </Dialog>
            <ConfirmDialog isDialog={isDialog} closeDialog={() => setIsDialog(false)} confirm={handleConfirm} />
        </div>
    )
}

export default OwnMacro;