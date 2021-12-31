import { FunctionComponent, Fragment, useState, Ref, ReactElement, forwardRef } from "react";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { useDailyMeasurements } from "../../hooks/useDailyMeasurements";
import { getShortDate, reverseDateDotes } from "../../utils/manageDate";
import { useAppSelector } from "../../hooks/useRedux";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { insertThoseIDStoDB, is_id, overwriteThoseIDSinDB } from "../../utils/API";
import useTranslation from "next-translate/useTranslation";
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const TimelineComponent: FunctionComponent = () => {
    const { t } = useTranslation('home');
    const [{ data }, reload]: any = useDailyMeasurements(getShortDate(), useAppSelector(state => state.config.numberSupportedDays))
    const [isDialog, setIsDialog] = useState(false)
    const [change, setChange]: any = useState({})
    const [weight, setWeight]: any = useState(0)


    const submit = async () => {
        if (change.weight != weight) {
            if (await is_id(change._id)) {
                await overwriteThoseIDSinDB('daily_measurement', [{ ...change, ...{ weight } }])
            } else {
                await insertThoseIDStoDB('daily_measurement', [{ ...change, ...{ weight } }])
            }
            reload()
        }
        setIsDialog(false)
    }

    return (
        <div>
            <Fragment>
                <Timeline position="alternate">
                    {
                        data &&
                        data.length > 0 &&
                        data.map(x =>
                            <TimelineItem key={x._id} onClick={() => {
                                setWeight(x.weight)
                                setChange(x)
                                setIsDialog(true)
                            }}>
                                <TimelineOppositeContent color="text.secondary">
                                    {reverseDateDotes(x.whenAdded)}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                    {x.weight}kg
                                </TimelineContent>
                            </TimelineItem>
                        )
                    }
                </Timeline>
            </Fragment>
            <Dialog
                open={isDialog}
                onClose={() => setIsDialog(false)}
                TransitionComponent={Transition}
            >
                <DialogTitle>{t('Add weight')}</DialogTitle>
                <DialogContent>
                    <OutlinedInput
                        id="outlined-adornment-weight"
                        value={weight}
                        fullWidth
                        type="number"
                        onChange={(e) => setWeight(e.target.value)}
                        endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialog(false)}>{t('Deny')}</Button>
                    <Button onClick={submit}>{t('Confirm')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default TimelineComponent;