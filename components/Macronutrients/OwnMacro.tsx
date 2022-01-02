import { FunctionComponent, forwardRef, Ref, ReactElement, useState } from "react";
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
    const [isDialog, setIsDialog] = useState(false)
    const [proteins, setProteins] = useState(0)
    const [carbs, setCarbs] = useState(0)
    const [fats, setFats] = useState(0)
    const [changeSettings] = useSettings()

    const handleConfirm = async () => {
        setIsDialog(false)
        let macro = []
        for(let i=1; i<8; i++){
            macro.push({
                proteins,
                carbs,
                fats,
                day: i
            })
        }
        await changeSettings({ macronutrients: macro })
        close()
    }

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
                        You can settle own macro, but it's only for people, who knows how to play w macro. Mostly you want coach to does it for you.
                    </DialogContentText>
                    <TextField
                        fullWidth
                        sx={{ marginTop: '5px' }}
                        id="outlined-basic"
                        label="Proteins"
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
                        label="Carbs"
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
                        label="Fats"
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