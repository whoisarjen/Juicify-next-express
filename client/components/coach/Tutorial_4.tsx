import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import styles from '../../styles/coach.module.css'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

interface Tutorial_4Props {
    setStep: (arg0: string) => void
}

const Tutorial_4: FunctionComponent<Tutorial_4Props> = ({ setStep }) => {
    const { t } = useTranslation('coach')

    return (
        <div className={styles.tutorla}>
            <div className={styles.arrowBack}>
                <IconButton aria-label="back" onClick={() => setStep('Tutorial_3')}>
                    <KeyboardBackspaceIcon />
                    <div />
                </IconButton>
            </div>
            <div className={styles.AddWeightMainTitle}><div>{t('HOW_OFTEN_EAT')}</div></div>
            <div>{t('TUTORIAL_4')}</div>
            <Button variant="contained" onClick={() => setStep('Tutorial_5')}>{t('NEXT_STEP')}</Button>
        </div>
    )
}

export default Tutorial_4;