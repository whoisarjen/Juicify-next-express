import { FunctionComponent } from "react";
import Button from '@mui/material/Button';
import styles from '../../styles/coach.module.css'
import { useAppSelector } from "../../hooks/useRedux";
import useTranslation from "next-translate/useTranslation";

interface ResultProps {
    setStep: (arg0: string) => void
}

const Result: FunctionComponent<ResultProps> = ({ setStep }) => {
    const { t } = useTranslation('coach')
    const token: any = useAppSelector(state => state.token.value)
    console.log(token)

    return (
        <div className={styles.results}>
            <div className={styles.AddWeightMainTitle}><div>{t('RESULT_TITLE')}</div></div>
            <table>
                {
                    token &&
                    token.macronutrients &&
                    token.macronutrients.length > 0 &&
                    (
                        <tr>
                            <td>
                                {token.macronutrients[0].proteins}g
                            </td>
                            <td>
                                {token.macronutrients[0].carbs}g
                            </td>
                            <td>
                                {token.macronutrients[0].fats}g
                            </td>
                        </tr>
                    )
                }
                <tr>
                    <td>
                        {t('PROTEINS')}
                    </td>
                    <td>
                        {t('CARBS')}
                    </td>
                    <td>
                        {t('FATS')}
                    </td>
                </tr>
            </table>
            <div>{t('RESULT_TITLE_DESCIPRION')}</div>
            <Button variant="contained" onClick={() => setStep('Standard')}>{t('GOT_IT')}</Button>
            <Button variant="contained" color="error" onClick={() => setStep('Tutorial_1')}>{t('DONT_GET_IT')}</Button>
        </div>
    )
}

export default Result;