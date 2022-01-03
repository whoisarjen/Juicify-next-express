import { FunctionComponent, useState } from "react";
import Button from '@mui/material/Button';
import styles from '../../styles/coach.module.css'
import { useDailyMeasurements } from "../../hooks/useDailyMeasurements";
import { getShortDate, reverseDateDotes } from "../../utils/manageDate";
import Weights from '../common/Weights'
import useTranslation from "next-translate/useTranslation";

interface ChooseDietProps {
    setStep: (arg0: string) => void
}

const CheckingWeekData: FunctionComponent<ChooseDietProps> = ({ setStep }) => {
    const { t } = useTranslation('coach')
    const [{ data }, reload]: any = useDailyMeasurements(getShortDate(), 8)
    const [isWeights, setIsWeights] = useState(false)

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
                                data.map(x =>
                                    <tr>
                                        <td>{reverseDateDotes(x.whenAdded)}</td>
                                        <td>{x.weight}kg</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div>{t('CHECKING_WEEK_DESCRIPTION')}</div>
                    <Button variant="contained" onClick={() => setIsWeights(true)}>{t('CHANGE_WEIGHT')}</Button>
                </>
            }
            <Button variant="contained" onClick={() => setStep('ChooseCaloriesSource')} disabled={!data || data.weight == 0}>{t('CHECKING_TODAY_BUTTON')}</Button>
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