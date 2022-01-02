import { FunctionComponent } from "react";
import Button from '@mui/material/Button';
import styles from '../../styles/coach.module.css'

interface WelcomeProps {
    setStep: (arg0: string) => void
}

const Welcome: FunctionComponent<WelcomeProps> = ({ setStep }) => {
    return (
        <div className={styles.welcome}>
        <div className={styles.AddWeightMainTitle}><div>Welcome</div></div>
            <div className="description">Welcome to your coach, I am an Artificial Intelligence created to analize your eatting habits and help you achieve goal as quickly as it's possible!</div>
            <Button variant="contained" onClick={() => setStep('CheckingTodayData')}>Let's start!</Button>
        </div>
    )
}

export default Welcome;