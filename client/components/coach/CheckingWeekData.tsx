import { FunctionComponent, useState, useEffect } from "react";
import Button from '@mui/material/Button';
import styles from '../../styles/coach.module.css'
import { useDailyMeasurements } from "../../hooks/useDailyMeasurements";
import { addDaysToDate, getShortDate, reverseDateDotes } from "../../utils/date.utils";
import Weights from '../common/Weights'
import useTranslation from "next-translate/useTranslation";
import { useAppSelector } from "../../hooks/useRedux";
import { DailyMeasurementSchemaProps } from "../../schema/dailyMeasurement.schema";

interface ChooseDietProps {
    setStep: (arg0: string) => void
}

const CheckingWeekData: FunctionComponent<ChooseDietProps> = ({ setStep }) => {
    const { t } = useTranslation('coach')
    const token: any = useAppSelector(state => state.token.value)
    const [{ data }, reload]: any = useDailyMeasurements(getShortDate(), 15, token.login)
    const [isWeights, setIsWeights] = useState(false)
    const [allowNextStep, setAllowNextStep] = useState(false)

    useEffect(() => {
        let count = 0;
        if (data) {
            data.forEach((x: DailyMeasurementSchemaProps) => {
                if (new Date(getShortDate()).toJSON() == new Date(x.whenAdded).toJSON()  && x.weight && x.weight > 0) {
                    count++;
                } else if (new Date(addDaysToDate(getShortDate(), -7)) > new Date(x.whenAdded)  && x.weight && x.weight > 0) {
                    count++;
                }
            })
        }
        if (count == 2) {
            setAllowNextStep(true)
        } else {
            setAllowNextStep(false)
        }
    }, [data])

    return (
        <div className={styles.checkingWeekData}>
            <div className={styles.AddWeightMainTitle}><div>{t('CHECKING_TODAY_TITLE')}</div></div>
            {
                <>
                    <table>
                        <tbody>
                            <th>{t("DATE")}</th>
                            <th>{t("WEIGHT")}</th>
                            {
                                data &&
                                data.length &&
                                data.map((x: DailyMeasurementSchemaProps) =>
                                    <tr key={x._id}>
                                        <td>{reverseDateDotes(x.whenAdded)}</td>
                                        <td>{x.weight}kg</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    {
                        !allowNextStep
                            ?
                            <div className={styles.checkingWeekDataDescription}>{t('CHECKING_WEEK_DESCRIPTION_ALTERNATIVE')}</div>
                            :
                            <div className={styles.checkingWeekDataDescription}>{t('CHECKING_WEEK_DESCRIPTION')}</div>
                    }
                    <Button variant="contained" onClick={() => setIsWeights(true)}>{t('CHANGE_WEIGHT')}</Button>
                </>
            }
            <Button
                variant="contained"
                onClick={() => setStep('ChooseCaloriesSource')}
                disabled={!allowNextStep}>
                {t('CHECKING_TODAY_BUTTON')}
            </Button>
            <Weights
                isWeights={isWeights}
                closeWeights={() => {
                    reload()
                    setIsWeights(false)
                }}
            />
        </div>
    )
}

export default CheckingWeekData;