import { FunctionComponent, useState, useEffect } from "react";
import Standard from "../components/coach/Standard";
import Result from "../components/coach/Result";
import Welcome from "../components/coach/Welcome";
import { expectLoggedIN } from "../utils/checkAuth";
import MuscleBuilding from "../components/coach/MuscleBuilding";
import ChooseDiet from "../components/coach/ChooseDiet";
import CheckingTodayData from "../components/coach/CheckingTodayData";
import Recomposition from '../components/coach/Recomposition';
import LosingWeight from '../components/coach/LosingWeight';
import CheckingWeekData from '../components/coach/CheckingWeekData';
import ChooseCaloriesSource from '../components/coach/ChooseCaloriesSource';
import Loading from '../components/coach/Loading';
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import useCoach from "../hooks/useCoach";
import { getAllIndexedDB, getIndexedDBbyID } from "../utils/indexedDB";
import { getAge, getDailyDate, getShortDate } from "../utils/manageDate";
import { loadMissingDays } from "../hooks/useDailyMeasurements";
import { setToken } from "../redux/features/tokenSlice";
import Tutorial_1 from "../components/coach/Tutorial_1";
import Tutorial_2 from "../components/coach/Tutorial_2";
import Tutorial_3 from "../components/coach/Tutorial_3";
import Tutorial_4 from "../components/coach/Tutorial_4";
import Tutorial_5 from "../components/coach/Tutorial_5";
import Tutorial_6 from "../components/coach/Tutorial_6";
import Tutorial_7 from "../components/coach/Tutorial_7";

const Coach: FunctionComponent = () => {
    expectLoggedIN()
    const [block, setBlock] = useState(true)
    const dispatch = useAppDispatch();
    const [createDiet, analyzeDiet] = useCoach()
    const token: any = useAppSelector(state => state.token.value)
    const [step, setStep] = useState('Loading')

    const prepareCreate = async (object: any) => {
        setStep('Loading')
        const daily = await getIndexedDBbyID('daily_measurement', getDailyDate())
        await createDiet({
            ...object,
            ...{
                weight: daily.weight,
                age: getAge(token.birth),
                today: getShortDate()
            }
        })
            .then(async response => {
                dispatch(setToken(response));
            })
            .then(() => setStep('Result'))
    }

    const prepareAnalize = async (isUseData: any) => {
        setStep('Loading')
        await analyzeDiet({
            isUseData,
            today: getShortDate(),
            age: getAge(token.birth),
            data: await loadMissingDays(await getAllIndexedDB('daily_measurement'), token._id, 15, getShortDate())
        })
            .then(async response => {
                dispatch(setToken(response));
            })
            .then(() => setStep('Result'))
    }

    const handlePreviousStep = () => setStep(token.coach_analyze ? 'Standard' : 'Welcome')

    useEffect(() => {
        if (block) {
            setBlock(false)
            setStep(token.coach_analyze ? 'Standard' : 'Welcome')
        }
    }, [token])

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
                    ) : step === 'Loading' ? (
                        <>
                            <Loading />
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