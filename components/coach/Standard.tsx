import { FunctionComponent, useState, useEffect } from "react";
import Button from '@mui/material/Button';
import styles from '../../styles/coach.module.css'
import IconButton from '@mui/material/IconButton';
import HistoryIcon from '@mui/icons-material/History';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useDailyMeasurement } from "../../hooks/useDailyMeasurement";
import { getShortDate, getDiffrentBetweenDays, addDaysToDate, reverseDateDotes } from "../../utils/manageDate";
import { useAppSelector } from "../../hooks/useRedux";
import Weights from "../common/Weights";
import HelpIcon from '@mui/icons-material/Help';
import useTranslation from "next-translate/useTranslation";

interface StandardProps {
    setStep: (arg0: string) => void
}

const Standard: FunctionComponent<StandardProps> = ({ setStep }) => {
    const { t } = useTranslation('coach')
    const [daysToCoach, setDaysToCoach] = useState(7)
    const [{ data }, reload] = useDailyMeasurement(getShortDate())
    const [isWeights, setIsWeights] = useState(false)
    const token: any = useAppSelector(state => state.token.value)

    useEffect(() => {
        if (token) {
            setDaysToCoach(getDiffrentBetweenDays(token.coach || getShortDate(), getShortDate()))
        }
    }, [token])

    return (
        <div className={styles.grid2Equal}>
            <div className={styles.AddWeightMain}>
                <div className={styles.AddWeightMainIconsSites}>
                    <div onClick={() => setStep('Welcome')}>
                        <IconButton aria-label="reset">
                            <RestartAltIcon />
                        </IconButton>
                        <div>{t('NEW_GOAL')}</div>
                    </div>
                    <div onClick={() => setStep('Tutorial_1')}>
                        <IconButton aria-label="help">
                            <HelpIcon />
                        </IconButton>
                        <div>{t('HELP')}</div>
                    </div>
                    <div onClick={() => setIsWeights(true)}>
                        <IconButton aria-label="history">
                            <HistoryIcon />
                        </IconButton>
                        <div>{t('HISTORY')}</div>
                    </div>
                </div>
                <div className={styles.AddWeightMainTitle}>
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
                </div>
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
            </div>
            <div className={styles.seperate} />
            <div className={styles.AddWeightSecond}>
                <div className={styles.AddWeightSecondInfo}>
                    <div>
                        <div>{t('LAST_CHECK')}</div>
                        <div className={styles.AddWeightSecondInfoBold}>{reverseDateDotes(addDaysToDate(token.coach, -7))}</div>
                    </div>
                    <div />
                    <div>
                        <div>{t('NEXT_CHECK')}</div>
                        <div className={styles.AddWeightSecondInfoBold}>{reverseDateDotes(token.coach)}</div>
                    </div>
                </div>
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
                            <div>It's time to check your progress!</div>
                            <div>
                                <Button variant="contained" color="error">Check progress</Button>
                            </div>
                        </>
                }
            </div>
            <Weights
                isWeights={isWeights}
                closeWeights={() => {
                    reload()
                    setIsWeights(false)
                }}
            />
        </div >
    )
}

export default Standard;