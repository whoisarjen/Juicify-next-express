import { FunctionComponent } from "react";
import Button from '@mui/material/Button';
import styles from '../../styles/coach.module.css'
import useTranslation from "next-translate/useTranslation";

interface ChooseDietProps {
    setStep: (arg0: string) => void
}

const ChooseDiet: FunctionComponent<ChooseDietProps> = ({ setStep }) => {
    const { t } = useTranslation('coach')

    return (
        <div className={styles.chooseDiet}>
            <div className={styles.AddWeightMainTitle}><div>{t('CHOOSE_DIET_TITLE')}</div></div>
            <div>{t('CHOOSE_DIET_DESCRIPTION')}</div>
            <Button variant="contained" onClick={() => setStep('MuscleBuilding')}>{t('MUSCLE_BUILDING')}</Button>
            <Button variant="contained" onClick={() => setStep('Recomposition')}>{t('RECOMPOSITION')}</Button>
            <Button variant="contained" onClick={() => setStep('LosingWeight')}>{t('LOSING_WEIGHT')}</Button>
        </div>
    )
}

export default ChooseDiet;