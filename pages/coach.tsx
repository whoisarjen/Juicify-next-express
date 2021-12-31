import { FunctionComponent, useState } from "react";
import Standard from "../components/coach/Standard";
import Result from "../components/coach/Result";
import Welcome from "../components/coach/Welcome";
import { expectLoggedIN } from "../utils/checkAuth";

const coachOptions = [
    { link: '', title: 'Muscle build', description: 'Juicify gona prepare program, which will allow you to optimal grow muscle, while keeping fat as low as it is possible.' },
    { link: '', title: 'Recomposition' },
    { link: '', title: 'Lose weight' },
    { link: '', title: 'Reverse diet' },
    { link: '', title: 'Custome' }
]

const Coach: FunctionComponent = () => {
    expectLoggedIN()
    const [step, setStep] = useState('Standard')

    return (
        <div className="coach">
            {
                step === 'Welcome' ?
                    (
                        <>
                            <Welcome setStep={setStep} />
                        </>
                    ) : step === 'Standard' ? (
                        <>
                            <Standard setStep={setStep} />
                        </>
                    ) : step === 'Result' ? (
                        <>
                            <Result setStep={setStep} />
                        </>
                    ) : (
                        <>
                            END
                        </>
                    )
            }
        </div>
    );
};

export default Coach;