import { FunctionComponent } from "react";
import Button from '@mui/material/Button';
import styles from '../../styles/coach.module.css'

interface WelcomeProps {
    setStep: (arg0: string) => void
}

const Welcome: FunctionComponent<WelcomeProps> = ({ setStep }) => {
    return (
        <div className={styles.welcome}>
            <div className="title">Welcome</div>
            <div className="description">Welcome to your coach, let's together achieve your goal! What diet should we start with?</div>
            <Button variant="contained" onClick={() => setStep('')}>Muscle building</Button>
            <Button variant="contained" onClick={() => setStep('')}>Recomposition</Button>
            <Button variant="contained" onClick={() => setStep('')}>Losing weight</Button>
            <Button variant="contained" onClick={() => setStep('')}>Custome diet</Button>
        </div>
    )
}

export default Welcome;