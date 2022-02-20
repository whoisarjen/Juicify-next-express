import { useState, useEffect } from "react"
import useAxios from "../../../hooks/useAxios"
import { useAppSelector } from "../../../hooks/useRedux"
import useToken from "../../../hooks/useToken"
import { loadMissingDays } from "../../../utils/dailyMeasurement.utils"
import { getDailyDate, getAge, getShortDate } from "../../../utils/date.utils"
import { getIndexedDBbyID, getAllIndexedDB } from "../../../utils/indexedDB.utils"

const useCoach = () => {
    const { post } = useAxios()
    const { dispatchToken } = useToken()
    const token: any = useAppSelector(state => state.token.value)
    const [step, setStep] = useState(token.coach_analyze ? 'Standard' : 'Welcome')

    const prepareCreate = async (object: any) => {
        const daily = await getIndexedDBbyID('daily_measurement', getDailyDate())
        try {
            const response = await post({
                url: '/coach/create',
                object: {
                    ...object,
                    ...{
                        weight: daily.weight,
                        age: getAge(token.birth),
                        today: getShortDate()
                    }
                }
            })
            await dispatchToken(response.data)
            setStep('Result')
        } catch (error: any) {
            console.log(error)
        }
    }

    const prepareAnalize = async (isUseData: any) => {
        try {
            const response = await post({
                url: '/coach/analyze',
                object: {
                    isUseData,
                    today: getShortDate(),
                    age: getAge(token.birth),
                    data: await loadMissingDays(await getAllIndexedDB('daily_measurement'), token._id, 15, getShortDate())
                }
            })
            await dispatchToken(response.data)
            setStep('Result')
        } catch (error: any) {
            console.log(error)
        }
    }

    const handlePreviousStep = () => setStep(token.coach_analyze ? 'Standard' : 'Welcome')

    useEffect(() => {
        setStep(token.coach_analyze ? 'Standard' : 'Welcome')
    }, [])

    return { step, setStep, prepareCreate, prepareAnalize, handlePreviousStep }
}

export type useCoachProps = ReturnType<typeof useCoach>

export default useCoach;