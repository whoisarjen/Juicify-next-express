import Link from "next/link"
import { useRouter } from "next/router"
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useAddDaysToDate } from '../../../hooks/useDate'
import { useDailyMeasurement } from '../../../hooks/useDaily'
import MealBox from "../../../components/nutrition-diary/MealBox"
import AddProducts from '../../../components/nutrition-diary/AddProducts'

const NutritionDiary = () => {
    const router = useRouter()
    const [index, setIndex] = useState(0)
    const token = useSelector(state => state.token.value)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [nutrition_diary, setNutrition_diary] = useState([])
    const [dailyMeasurement, reloadDailyMeasurement] = useDailyMeasurement(router.query.date)

    useEffect(() => {
        if (dailyMeasurement && dailyMeasurement.nutrition_diary) {
            const arr = []
            for (let i = 0; i < token.meal_number; i++) {
                arr.push([])
            }
            const length = arr.length
            dailyMeasurement.nutrition_diary.forEach(meal => {
                if (meal.meal + 1 > length) {
                    for (let i = 0; i < meal.meal + 1 - length; i++) {
                        arr.push([])
                    }
                }
                arr[meal.meal].push(meal)
            })
            setNutrition_diary(arr)
        }
    }, [dailyMeasurement])

    return (
        <div className="NutritionDiary">
            <button onClick={reloadDailyMeasurement}>123</button>
            {dailyMeasurement && dailyMeasurement.whenAdded}
            <Link passHref href={`/${router.query.login}/nutrition-diary/${useAddDaysToDate(router.query.date, 1)}`}><a>Next</a></Link>
            {
                nutrition_diary && nutrition_diary.map((x, i) => (
                    <MealBox
                        key={i}
                        index={i}
                        products={x}
                        openDialog={() => {
                            setIndex(i)
                            setIsDialogOpen(true)
                        }}
                    />
                ))
            }
            {
                token.login == router.query.login &&
                <AddProducts
                    index={index}
                    isDialogOpen={isDialogOpen}
                    dailyMeasurement={dailyMeasurement}
                    closeDialog={() => setIsDialogOpen(false)}
                />
            }
        </div>
    );
};

export default NutritionDiary;
