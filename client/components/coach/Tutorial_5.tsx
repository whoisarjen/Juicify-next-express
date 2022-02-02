import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import styles from '../../styles/coach.module.css'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

interface Tutorial_5Props {
    setStep: (arg0: string) => void
}

const Tutorial_5: FunctionComponent<Tutorial_5Props> = ({ setStep }) => {
    const { t } = useTranslation('coach')

    return (
        <div className={styles.tutorla}>
            <div className={styles.arrowBack}>
                <IconButton aria-label="back" onClick={() => setStep('Tutorial_4')}>
                    <KeyboardBackspaceIcon />
                    <div />
                </IconButton>
            </div>
            <div className={styles.AddWeightMainTitle}><div>{t('WEIGHT_SELF')}</div></div>
            <div>{t('TUTORIAL_5')}</div>
            <Button variant="contained" onClick={() => setStep('Tutorial_6')}>{t('NEXT_STEP')}</Button>
        </div>
    )
}

export default Tutorial_5;