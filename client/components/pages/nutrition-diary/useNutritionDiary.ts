import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useDailyMeasurement } from "../../../hooks/useDailyMeasurement"
import { useAppSelector } from "../../../hooks/useRedux"
import { overwriteThoseIDSinDB } from "../../../utils/db.utils"

const useNutritionDiary = () => {
    const { t } = useTranslation('nutrition-diary')
    const router: any = useRouter()
    const [index, setIndex] = useState(0)
    const [product, setProduct] = useState({ _id: '' }) // Placeholder is necessary
    const token: any = useAppSelector(state => state.token.value)
    const [isAddDialog, setIsAddDialog] = useState(false)
    const [isEditDialog, setIsEditDialog] = useState(false)
    const [nutritionDiary, setNutritionDiary] = useState(Array(5).fill([]))
    const { data, user, reload } = useDailyMeasurement(router.query.date, router.query.login)

    const deleteProduct = async (_id: string) => {
        let copy = JSON.parse(JSON.stringify(data))
        copy.nutrition_diary = copy.nutrition_diary.map((obj: any) =>
            obj._id == _id ? { ...obj, deleted: true } : obj
        );
        await overwriteThoseIDSinDB('daily_measurement', [copy])
        reload()
    }

    const changeProduct = async (newProduct: any) => {
        let copy = JSON.parse(JSON.stringify(data))
        copy.nutrition_diary = copy.nutrition_diary.map((obj: any) =>
            obj._id == newProduct._id ? { ...obj, ...{ changed: true }, ...newProduct } : obj
        );
        await overwriteThoseIDSinDB('daily_measurement', [copy])
        reload()
    }

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

    return { t, router, token, nutritionDiary, user, reload, index, setIndex, product, setProduct, isEditDialog, setIsEditDialog, isAddDialog, setIsAddDialog, deleteProduct, changeProduct, data }
}

export type useNutritionDiaryProps = ReturnType<typeof useNutritionDiary>

export default useNutritionDiary;