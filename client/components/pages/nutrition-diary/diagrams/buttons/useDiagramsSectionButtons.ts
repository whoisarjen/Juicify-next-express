import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useState } from "react"
import { DiagramsOptionsProps } from "."
import { insertThoseIDStoDBController } from "../../../../../utils/db.utils"

const useDiagramsSectionButtons = ({ data, reloadDailyMeasurement }: DiagramsOptionsProps) => {
    const router: any = useRouter()
    const { t } = useTranslation('nutrition-diary')
    const [activity, setActivity] = useState('')
    const [burnt, setBurnt] = useState(0)
    const [isAddActivity, setIsAddActivity] = useState(false)

    const addNewActivity = async () => {
        if (activity || burnt) {
            let calories = -burnt
            let object: any = { ...data }
            object.nutrition_diary.push({
                _id: 'XD' + new Date().getTime(),
                ...(activity && { activity }),
                ...(calories && { calories })
            })
            await insertThoseIDStoDBController('daily_measurement', [object])
            reloadDailyMeasurement()
        }
        setBurnt(0)
        setActivity('')
        setIsAddActivity(false)
    }

    return { router, isAddActivity, setIsAddActivity, activity, setActivity, burnt, setBurnt, addNewActivity, t }
}

export type useDiagramsSectionButtonsProps = ReturnType<typeof useDiagramsSectionButtons>

export default useDiagramsSectionButtons;