import { FunctionComponent } from "react";
import Button from '@mui/material/Button';
import styles from '../../styles/coach.module.css'

interface ChooseDietProps {
    setStep: (arg0: string) => void
}

const ChooseDiet: FunctionComponent<ChooseDietProps> = ({ setStep }) => {
    return (
        <div className={styles.chooseDiet}>
            <div className={styles.AddWeightMainTitle}><div>Choose diet</div></div>
            <div>It's time to choose type of diet, which you are interested in.</div>
            <Button variant="contained" onClick={() => setStep('MuscleBuilding')}>Muscle building</Button>
            <Button variant="contained" onClick={() => setStep('Recomposition')}>Recomposition</Button>
            <Button variant="contained" onClick={() => setStep('LosingWeight')}>Losing weight</Button>
        </div>
    )
}

export default ChooseDiet;