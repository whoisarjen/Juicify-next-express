import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import styles from '../../styles/coach.module.css'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Image from 'next/image'

interface Tutorial_2Props {
    setStep: (arg0: string) => void,
    handlePreviousStep: (arg0: string) => void
}

const Tutorial_2: FunctionComponent<Tutorial_2Props> = ({ setStep, handlePreviousStep }) => {
    const { t } = useTranslation('coach')

    return (
        <div className={styles.tutorla}>
            <div className={styles.arrowBack}>
                <IconButton aria-label="back" onClick={() => setStep('Tutorial_1')}>
                    <KeyboardBackspaceIcon />
                    <div />
                </IconButton>
            </div>
            <Image
                src="/images/tutorial_2.jpg"
                alt="Coach tutorial 2"
                width="970"
                height="728"
            />
            <div>{t('TUTORIAL_2')}</div>
            <Button variant="contained" onClick={() => setStep('Tutorial_3')}>{t('NEXT_STEP')}</Button>
        </div>
    )
}

export default Tutorial_2;