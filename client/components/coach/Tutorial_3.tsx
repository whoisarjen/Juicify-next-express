import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import styles from '../../styles/coach.module.css'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Image from 'next/image'

interface Tutorial_3Props {
    setStep: (arg0: string) => void
}

const Tutorial_3: FunctionComponent<Tutorial_3Props> = ({ setStep }) => {
    const { t } = useTranslation('coach')

    return (
        <div className={styles.tutorla}>
            <div className={styles.arrowBack}>
                <IconButton aria-label="back" onClick={() => setStep('Tutorial_2')}>
                    <KeyboardBackspaceIcon />
                    <div />
                </IconButton>
            </div>
            <Image
                src="/images/tutorial_3.jpg"
                alt="Coach tutorial 3"
                width="970"
                height="728"
            />
            <div>{t('TUTORIAL_3')}</div>
            <Button variant="contained" onClick={() => setStep('Tutorial_4')}>{t('NEXT_STEP')}</Button>
        </div>
    )
}

export default Tutorial_3;