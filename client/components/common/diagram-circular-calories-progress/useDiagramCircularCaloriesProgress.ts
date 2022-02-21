import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { DiagramCircularCaloriesProgressProps } from "."
import { useTheme } from "../../../hooks/useTheme"
import { getCalories } from "../../../utils/product.utils"
import { getMacroByDay } from "../../../utils/user.utils"

const useDiagramCircularCaloriesProgress = ({ array, user }: DiagramCircularCaloriesProgressProps) => {
    const [calories, setCalories] = useState(0)
    const [progress, setProgress] = useState(0)
    const router = useRouter()
    const { getTheme } = useTheme()
    const { t } = useTranslation('nutrition-diary')

    useEffect(() => {
        if (array) {
            const macro = getMacroByDay(router.query.date, user)
            let count: any = 0;
            if (array.length) {
                for (let i = 0; i < array.length; i++) {
                    if (array[i].length) {
                        for (let a = 0; a < array[i].length; a++) {
                            count += getCalories(array[i][a])
                        }
                    }
                }
            }
            setCalories(count)
            setProgress(count / parseInt((macro.proteins * 4 + macro.carbs * 4 + macro.fats * 9).toString()) * 100)
        }
    }, [array, user])

    return { progress, calories, getTheme, t }
}

export type useDiagramCircularCaloriesProgressProps = ReturnType<typeof useDiagramCircularCaloriesProgress>

export default useDiagramCircularCaloriesProgress;
