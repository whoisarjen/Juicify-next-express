import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import styles from '../../styles/coach.module.css'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

interface Tutorial_1Props {
    setStep: (arg0: string) => void,
    handlePreviousStep: () => void
}

const Tutorial_1: FunctionComponent<Tutorial_1Props> = ({ setStep, handlePreviousStep }) => {
    const { t } = useTranslation('coach')

    return (
        <div className={styles.tutorla}>
            <div className={styles.arrowBack}>
                <IconButton aria-label="back" onClick={handlePreviousStep}>
                    <KeyboardBackspaceIcon />
                    <div />
                </IconButton>
            </div>
            <div className={styles.AddWeightMainTitle}><div>{t('HOW_DOES_IT_WORK')}</div></div>
            <div>{t('TUTORIAL_1')}</div>
            <Button variant="contained" onClick={() => setStep('Tutorial_2')}>{t('NEXT_STEP')}</Button>
        </div>
    )
}

export default Tutorial_1;