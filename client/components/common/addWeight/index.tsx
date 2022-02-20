import { Fragment, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { useDailyMeasurements } from "../../../hooks/useDailyMeasurements";
import { getShortDate, reverseDateDotes } from "../../../utils/date.utils";
import { useAppSelector } from "../../../hooks/useRedux";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { insertThoseIDStoDBController } from "../../../utils/db.utils";
import styled from 'styled-components'
import { DailyMeasurementSchemaProps } from "../../../schema/dailyMeasurement.schema";
import SlideUp from "../../transition/SlideUp";
import ButtonCloseDialog from "../button-close-dialog";

interface AddWeightProps {
    children: any,
}

const Content = styled.div`
    width: 100%;
    margin: 0 auto;
    max-width: 702px;
    padding: 12px;
    display: grid;
    min-height: calc(100vh - var(--BothNavHeightAndPadding));
    @media (max-width: 726px) {
        width: calc(100% - 24px);
    }
`

const Title = styled.div`
    font-size: 2rem;
    margin-bottom: 10px;
    font-weight: bold;
`

const Description = styled.div`
    font-size: 0.9rem;
    margin: auto 0;
`

const AddWeight = ({ children }: AddWeightProps) => {
    const [isWeights, setIsWeight] = useState(false)
    const token: any = useAppSelector(state => state.token.value)
    const { data } = useDailyMeasurements(getShortDate(), useAppSelector(state => state.config.numberSupportedDays), token.login)
    const [isDialog, setIsDialog] = useState(false)
    const [change, setChange]: any = useState({})
    const [weight, setWeight]: any = useState(0)
    const { t } = useTranslation('home')

    const submit = async () => {
        if (change.weight != weight) {
            await insertThoseIDStoDBController('daily_measurement', [{ ...change, ...{ weight } }])
        }
        setIsDialog(false)
    }

    return (
        <>
            <div onClick={() => setIsWeight(true)}>{children}</div>
            <Dialog
                fullScreen
                scroll='body'
                open={isWeights}
                TransitionComponent={SlideUp}
            >
                <Content>
                    <Title>{t('Add weight')}</Title>
                    <Description>
                        {t('Add weight description')}
                    </Description>
                    <Fragment>
                        <Timeline position="alternate">
                            {
                                data?.length > 0 &&
                                data.map((x: DailyMeasurementSchemaProps) =>
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
                    <ButtonCloseDialog clicked={() => setIsWeight(false)} />
                </Content>
                <Dialog
                    open={isDialog}
                    onClose={() => setIsDialog(false)}
                    TransitionComponent={SlideUp}
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
        </>
    )
}

export default AddWeight;