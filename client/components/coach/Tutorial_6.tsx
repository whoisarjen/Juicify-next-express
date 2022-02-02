import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import styles from '../../styles/coach.module.css'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

interface Tutorial_6Props {
    setStep: (arg0: string) => void,
    handlePreviousStep: (arg0: string) => void
}

const Tutorial_6: FunctionComponent<Tutorial_6Props> = ({ setStep, handlePreviousStep }) => {
    const { t } = useTranslation('coach')

    return (
        <div className={styles.tutorla}>
            <div className={styles.arrowBack}>
                <IconButton aria-label="back" onClick={() => setStep('Tutorial_5')}>
                    <KeyboardBackspaceIcon />
                    <div />
                </IconButton>
            </div>
            <div className={styles.AddWeightMainTitle}><div>{t('EXTRA_ACTIVITY')}</div></div>
            <div>{t('TUTORIAL_6')}</div>
            <Button variant="contained" onClick={() => setStep('Tutorial_7')}>{t('NEXT_STEP')}</Button>
        </div>
    )
}

export default Tutorial_6;