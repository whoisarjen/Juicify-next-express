import CheckingTodayData from "./CheckingTodayData";
import CheckingWeekData from "./CheckingWeekData";
import ChooseCaloriesSource from "./ChooseCaloriesSource";
import ChooseDiet from "./ChooseDiet";
import LosingWeight from "./LosingWeight";
import MuscleBuilding from "./MuscleBuilding";
import Recomposition from "./Recomposition";
import Result from "./Result";
import Standard from "./Standard";
import Tutorial_1 from "./Tutorial_1";
import Tutorial_2 from "./Tutorial_2";
import Tutorial_3 from "./Tutorial_3";
import Tutorial_4 from "./Tutorial_4";
import Tutorial_5 from "./Tutorial_5";
import Tutorial_6 from "./Tutorial_6";
import Tutorial_7 from "./Tutorial_7";
import { useCoachProps } from "./useCoach";
import Welcome from "./Welcome";

const Coach = ({ step, setStep, prepareCreate, prepareAnalize, handlePreviousStep }: useCoachProps) => {
    return (
        <div className="coach">
            {
                step === 'Welcome' ?
                    (
                        <>
                            <Welcome setStep={setStep} />
                        </>
                    ) : step === 'CheckingTodayData' ? (
                        <>
                            <CheckingTodayData setStep={setStep} />
                        </>
                    ) : step === 'ChooseDiet' ? (
                        <>
                            <ChooseDiet setStep={setStep} handlePreviousStep={handlePreviousStep} />
                        </>
                    ) : step === 'MuscleBuilding' ? (
                        <>
                            <MuscleBuilding prepareCreate={prepareCreate} handlePreviousStep={handlePreviousStep} />
                        </>
                    ) : step === 'Recomposition' ? (
                        <>
                            <Recomposition prepareCreate={prepareCreate} handlePreviousStep={handlePreviousStep} />
                        </>
                    ) : step === 'LosingWeight' ? (
                        <>
                            <LosingWeight prepareCreate={prepareCreate} handlePreviousStep={handlePreviousStep} />
                        </>
                    ) : step === 'Standard' ? (
                        <>
                            <Standard setStep={setStep} />
                        </>
                    ) : step === 'CheckingWeekData' ? (
                        <>
                            <CheckingWeekData setStep={setStep} />
                        </>
                    ) : step === 'ChooseCaloriesSource' ? (
                        <>
                            <ChooseCaloriesSource prepareAnalize={prepareAnalize} />
                        </>
                    ) : step === 'Result' ? (
                        <>
                            <Result setStep={setStep} />
                        </>
                    ) : step === 'Tutorial_1' ? (
                        <>
                            <Tutorial_1 setStep={setStep} handlePreviousStep={handlePreviousStep} />
                        </>
                    ) : step === 'Tutorial_2' ? (
                        <>
                            <Tutorial_2 setStep={setStep} />
                        </>
                    ) : step === 'Tutorial_3' ? (
                        <>
                            <Tutorial_3 setStep={setStep} />
                        </>
                    ) : step === 'Tutorial_4' ? (
                        <>
                            <Tutorial_4 setStep={setStep} />
                        </>
                    ) : step === 'Tutorial_5' ? (
                        <>
                            <Tutorial_5 setStep={setStep} />
                        </>
                    ) : step === 'Tutorial_6' ? (
                        <>
                            <Tutorial_6 setStep={setStep} />
                        </>
                    ) : step === 'Tutorial_7' ? (
                        <>
                            <Tutorial_7 setStep={setStep} handlePreviousStep={handlePreviousStep} />
                        </>
                    ) : (
                        <>
                            {"We didn't code anything like that :("}
                            <button onClick={() => setStep('Welcome')}></button>
                        </>
                    )
            }
        </div>
    );
};

export default Coach;