import { FunctionComponent } from "react";
import Button from '@mui/material/Button';
import styles from '../../styles/coach.module.css'
import useTranslation from "next-translate/useTranslation";

interface WelcomeProps {
    setStep: (arg0: string) => void
}

const Welcome: FunctionComponent<WelcomeProps> = ({ setStep }) => {
    const { t } = useTranslation('coach')

    return (
        <div className={styles.welcome}>
        <div className={styles.AddWeightMainTitle}><div>{t('WELCOME_TITLE')}</div></div>
            <div className="description">{t('WELCOME_DESCRIPTION')}</div>
            <Button variant="contained" onClick={() => setStep('CheckingTodayData')}>{t('WELCOME_BUTTON')}</Button>
        </div>
    )
}

export default Welcome;