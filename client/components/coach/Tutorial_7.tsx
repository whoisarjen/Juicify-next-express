import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import styles from '../../styles/coach.module.css'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

interface Tutorial_7Props {
    setStep: (arg0: string) => void,
    handlePreviousStep: () => void
}

const Tutorial_7: FunctionComponent<Tutorial_7Props> = ({ setStep, handlePreviousStep }) => {
    const { t } = useTranslation('coach')

    return (
        <div className={styles.tutorla}>
            <div className={styles.arrowBack}>
                <IconButton aria-label="back" onClick={() => setStep('Tutorial_6')}>
                    <KeyboardBackspaceIcon />
                    <div />
                </IconButton>
            </div>
            <div className={styles.AddWeightMainTitle}><div>{t('THATS_ALL')}</div></div>
            <div>{t('TUTORIAL_7')}</div>
            <Button variant="contained" onClick={handlePreviousStep}>{t('I_AM_READY')}</Button>
        </div>
    )
}

export default Tutorial_7;