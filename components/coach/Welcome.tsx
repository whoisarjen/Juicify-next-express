import { FunctionComponent } from "react";

interface WelcomeProps {
    setStep: (arg0: string) => void
}

const Welcome: FunctionComponent<WelcomeProps> = ({ setStep }) => {
    return (
        <div>
            <div className="title">Program type</div>
            <div className="description">Choose program type, which best fit your goal.</div>
            <button onClick={() => setStep('Result')}>Result</button>
        </div>
    )
}

export default Welcome;