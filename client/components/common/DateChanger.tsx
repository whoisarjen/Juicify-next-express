import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { useRouter } from "next/router";
import EventIcon from '@mui/icons-material/Event';
import IconButton from '@mui/material/IconButton';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { TransitionProps } from '@mui/material/transitions';
import DialogContentText from '@mui/material/DialogContentText';
import { FunctionComponent, useState, forwardRef, Ref, ReactElement } from "react";
import CalendarPicker from '@mui/lab/CalendarPicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DateChanger: FunctionComponent<{ where?: string }> = ({ where = 'nutrition-diary' }) => {
    const router = useRouter()
    const [isDialog, setIsDialog] = useState(false)
    const [value, setValue] = useState<Date>(new Date());

    const handleDateChange = () => {
        setIsDialog(false);
        router.push(`/${router.query.login}/${where}/${new Date(value).toJSON().slice(0, 10)}`)
    };

    return (
        <>
            <IconButton onClick={() => setIsDialog(true)}>
                <EventIcon color="primary" />
            </IconButton>
            <Dialog
                open={isDialog}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <CalendarPicker date={value} onChange={(newDate) => setValue(newDate || new Date())} />
                        </LocalizationProvider>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialog(false)}>Close</Button>
                    <Button onClick={handleDateChange}>Agree</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DateChanger;