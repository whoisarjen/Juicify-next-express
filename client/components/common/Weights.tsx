import { FunctionComponent, Fragment, useState, Ref, ReactElement, forwardRef } from "react";
import styles from '../../styles/nutrition-diary.module.css'
import useTranslation from "next-translate/useTranslation";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { useDailyMeasurements } from "../../hooks/useDailyMeasurements";
import { getShortDate, reverseDateDotes } from "../../utils/date.utils";
import { useAppSelector } from "../../hooks/useRedux";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { insertThoseIDStoDB, is_id, overwriteThoseIDSinDB } from "../../utils/db.utils";
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import DailyMeasurementProps from "../../interfaces/dailyMeasurement.interface";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface WeightsProps {
    isWeights: boolean,
    closeWeights: () => void
}

const Weights: FunctionComponent<WeightsProps> = ({ isWeights, closeWeights }) => {
    const token: any = useAppSelector(state => state.token.value)
    const [{ data }, reload]: any = useDailyMeasurements(
        getShortDate(),
        useAppSelector(state => state.config.numberSupportedDays),
        token.login
    )
    const [isDialog, setIsDialog] = useState(false)
    const [change, setChange]: any = useState({})
    const [weight, setWeight]: any = useState(0)
    const { t } = useTranslation('home')

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
            <Dialog
                fullScreen
                scroll='body'
                open={isWeights}
                TransitionComponent={Transition}
            >
                <div className="content">
                    <div className="title">{t('Add weight')}</div>
                    <div className="description">
                        {t('Add weight description')}
                    </div>
                    <Fragment>
                        <Timeline position="alternate">
                            {
                                data &&
                                data.length > 0 &&
                                data.map((x: DailyMeasurementProps) =>
                                    <TimelineItem key={x._id}>
                                        <TimelineOppositeContent color="text.secondary">
                                            {reverseDateDotes(x.whenAdded)}
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineDot />
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        {
                                            x.weight &&
                                                x.weight > 0
                                                ?
                                                <TimelineContent style={{ fontWeight: 'bold' }} onClick={() => {
                                                    setWeight(x.weight)
                                                    setChange(x)
                                                    setIsDialog(true)
                                                }}>
                                                    {x.weight}kg
                                                </TimelineContent>
                                                :
                                                <TimelineContent color="error" style={{ fontWeight: 'bold' }} onClick={() => {
                                                    setWeight(x.weight)
                                                    setChange(x)
                                                    setIsDialog(true)
                                                }}>
                                                    {x.weight}kg
                                                </TimelineContent>
                                        }
                                    </TimelineItem>
                                )
                            }
                        </Timeline>
                    </Fragment>
                    <div className={styles.addProductsCloseButtonPlaceholder} />
                    <div className={styles.addProductsCloseButton} onClick={closeWeights}>
                        <Button variant="contained">
                            {t('Close')}
                        </Button>
                    </div>
                </div>
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
            </Dialog>
        </div>
    )
}

export default Weights;