import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HistoryIcon from '@mui/icons-material/History';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useDailyMeasurement } from "../../hooks/useDailyMeasurement";
import { getShortDate, getDiffrentBetweenDays, addDaysToDate, reverseDateDotes } from "../../utils/date.utils";
import { useAppSelector } from "../../hooks/useRedux";
import Weights from "../common/Weights";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import useTranslation from "next-translate/useTranslation";
import styled from "styled-components";

interface StandardProps {
    setStep: (arg0: string) => void
}

const Grid = styled.div`
    width: 100%;
    min-height: calc(100vh - var(--BothNavHeightAndPadding));
    display: grid;
    grid-template-rows: 3fr auto 2fr;
    font-size: 0.9rem;
`

const Title = styled.div`
    font-size: 1.75rem;
    font-weight: bold;
    display: grid;
    padding: 20px 0;
    ${this} div {
        margin: auto;
    }
`

const Main = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: auto auto auto auto auto;
    text-align: center;
    ${this} div {
        margin: auto;
    }
`

const TopButtons = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    ${this} button {
        padding-bottom: 5px;
    }
    ${this} div {
        font-size: 0.75rem;
        text-transform: uppercase;
    }
`

const Seperate = styled.div`
    width: 100%;
    border-bottom: 1px solid #e4e4e4;
    margin: 24.5px 0;
`

const Second = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: auto auto auto;
    text-align: center;
    ${this} div:nth-child(1) {
        font-size: 0.75rem;
        text-transform: uppercase;
    }
`

const SecondInfo = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
`

const SecondBold = styled.div`
    font-size: 1.1rem;
    font-weight: bold;
`

const Standard = ({ setStep }: StandardProps) => {
    const { t } = useTranslation('coach')
    const [daysToCoach, setDaysToCoach] = useState(7)
    const token: any = useAppSelector(state => state.token.value)
    const [{ data }, reload] = useDailyMeasurement(getShortDate(), token.login)
    const [isWeights, setIsWeights] = useState(false)

    useEffect(() => {
        if (token) {
            setDaysToCoach(getDiffrentBetweenDays(token.coach || getShortDate(), getShortDate()))
        }
    }, [token])

    return (
        <Grid>
            <Main>
                <TopButtons>
                    <div onClick={() => setStep('Welcome')}>
                        <IconButton aria-label="reset">
                            <RestartAltIcon color="primary" />
                        </IconButton>
                        <div>{t('NEW_GOAL')}</div>
                    </div>
                    <div onClick={() => setStep('Tutorial_1')}>
                        <IconButton aria-label="help">
                            <HelpOutlineIcon color="primary" />
                        </IconButton>
                        <div>{t('HELP')}</div>
                    </div>
                    <div onClick={() => setIsWeights(true)}>
                        <IconButton aria-label="history">
                            <HistoryIcon color="primary" />
                        </IconButton>
                        <div>{t('HISTORY')}</div>
                    </div>
                </TopButtons>
                <Title>
                    {
                        token.goal === 0
                            ?
                            (
                                <div>
                                    {t('RECOMPOSITION')}
                                </div>
                            )
                            : token.goal > 0 ?
                                (
                                    <div>
                                        {t('MUSCLE_BUILDING')}
                                    </div>
                                )
                                :
                                (
                                    <div>
                                        {t('LOSING_WEIGHT')}
                                    </div>
                                )
                    }
                </Title>
                <div>{token.goal}% / {t('WEEK')}</div>
                <div>
                    {t('STANDARD_DESCRIPTION')}
                </div>
                <div>
                    {
                        data ?
                            (
                                data.weight > 0
                                    ?
                                    <Button variant="contained" onClick={() => setIsWeights(true)}>{t('CHANGE_WEIGHT')}</Button>
                                    :
                                    <Button variant="contained" color="error" onClick={() => setIsWeights(true)}>{t('ADD_WEIGHT')}</Button>
                            ) : (
                                <Button variant="contained" onClick={() => setIsWeights(true)}>{t('CHANGE_WEIGHT')}</Button>
                            )
                    }
                </div>
            </Main>
            <Seperate />
            <Second>
                <SecondInfo>
                    <div>
                        <div>{t('LAST_CHECK')}</div>
                        <SecondBold>{reverseDateDotes(addDaysToDate(token.coach, -7))}</SecondBold>
                    </div>
                    <div />
                    <div>
                        <div>{t('NEXT_CHECK')}</div>
                        <SecondBold>{reverseDateDotes(token.coach)}</SecondBold>
                    </div>
                </SecondInfo>
                {
                    daysToCoach > 0 ?
                        <>
                            <div>{daysToCoach} {t('DAYS_UNTIL_NEXT')}</div>
                            <div>
                                <Button disabled variant="contained">{t('STANDARD_BUTTON')}</Button>
                            </div>
                        </>
                        :
                        <>
                            <div>It&apos;s time to check your progress!</div>
                            <div>
                                <Button variant="contained" color="error">Check progress</Button>
                            </div>
                        </>
                }
            </Second>
            <Weights
                isWeights={isWeights}
                closeWeights={() => {
                    reload()
                    setIsWeights(false)
                }}
            />
        </Grid>
    )
}

export default Standard;