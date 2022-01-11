import { FunctionComponent, useState } from "react";
import Button from '@mui/material/Button';
import styles from '../../styles/coach.module.css'
import { useDailyMeasurement } from "../../hooks/useDailyMeasurement";
import { getAge, getShortDate } from "../../utils/manageDate";
import Weights from '../common/Weights'
import { useAppSelector } from "../../hooks/useRedux";
import useTranslation from "next-translate/useTranslation";

interface ChooseDietProps {
    setStep: (arg0: string) => void
}

const CheckingTodayData: FunctionComponent<ChooseDietProps> = ({ setStep }) => {
    const { t } = useTranslation('coach')
    const token: any = useAppSelector(state => state.token.value)
    const [{ data }, reload] = useDailyMeasurement(getShortDate(), token.login)
    const [isWeights, setIsWeights] = useState(false)

    return (
        <div className={styles.checkingTodayData}>
            <div className={styles.AddWeightMainTitle}><div>{t('CHECKING_TODAY_TITLE')}</div></div>
            {
                data &&
                (
                    data.weight > 0
                        ?
                        <>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>{t('HEIGHT')}:</th>
                                        <td>{token.height}cm</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <th>{t('WEIGHT')}:</th>
                                        <td>{data.weight}kg</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <th>{t('AGE')}:</th>
                                        <td>{getAge(token.birth)}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>{t('CHECKING_TODAY_DESCRIPTION')}</div>

                            <Button variant="contained" onClick={() => setIsWeights(true)}>{t('CHANGE_WEIGHT')}</Button>
                        </>
                        :
                        <>
                            <div />
                            <div>{t('CHECKING_TODAY_DESCRIPTION_ALTERNATIVE')}</div>
                            <Button variant="contained" color="error" onClick={() => setIsWeights(true)}>{t('ADD_WEIGHT')}</Button>
                        </>
                )
            }
            <Button variant="contained" onClick={() => setStep('ChooseDiet')} disabled={!data || data.weight == 0}>{t('CHECKING_TODAY_BUTTON')}</Button>
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

export default CheckingTodayData;