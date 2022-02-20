import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useDailyMeasurement } from "../../../hooks/useDailyMeasurement"
import { useAppSelector } from "../../../hooks/useRedux"

const useNutritionDiary = () => {
    const router: any = useRouter()
    const token: any = useAppSelector(state => state.token.value)
    const [nutritionDiary, setNutritionDiary] = useState(Array(5).fill([]))
    const { data, user } = useDailyMeasurement(router.query.date, router.query.login)

    useEffect(() => {
        if (data?.nutrition_diary) {
            const arr: any = []
            const l = user?.meal_number || 5
            for (let i = 0; i < l; i++) {
                arr.push([])
            }
            const length = arr.length
            data.nutrition_diary.forEach((meal: any) => {
                if (!meal.deleted) {
                    if (!meal.meal) {
                        meal.meal = 0
                    }
                    if (meal.meal + 1 > length) {
                        for (let i = 0; i < meal.meal + 1 - length; i++) {
                            arr.push([])
                        }
                    }
                    arr[meal.meal].push(meal)
                }
            })
            setNutritionDiary(arr)
        }
    }, [data])

    return { router, token, nutritionDiary, user, data }
}

export type useNutritionDiaryProps = ReturnType<typeof useNutritionDiary>

export default useNutritionDiary;