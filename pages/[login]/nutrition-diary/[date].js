import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react'
import { addDaysToDate } from '../../../hooks/useDate'
import { loadDailyMeasurement } from '../../../hooks/useDaily'
import MealBox from "../../../components/nutrition-diary/MealBox";
import AddProducts from '../../../components/nutrition-diary/AddProducts'
import { useSelector } from 'react-redux'

const NutritionDiary = () => {
    const router = useRouter()
    const [index, setIndex] = useState(0)
    const token = useSelector(state => state.token.value)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [when, setWhen] = useState(router.query.date)
    const dailyMeasurement = loadDailyMeasurement(when)
    const [nutrition_diary, setNutrition_diary] = useState([])

    useEffect(() => {
        if (dailyMeasurement && dailyMeasurement.nutrition_diary) {
            const arr = []
            for (let i = 0; i < token.meal_number; i++) {
                arr.push([])
            }
            const l = arr.length
            dailyMeasurement.nutrition_diary.forEach(meal => {
                if (meal.meal + 1 > l) {
                    for (let i = 0; i < meal.meal + 1 - l; i++) {
                        arr.push([])
                    }
                }
                arr[meal.meal].push(meal)
            })
            setNutrition_diary(arr)
        }
    }, [dailyMeasurement])

    useEffect(async () => setWhen(router.query.date), [router.query.date])

    return (
        <div className="NutritionDiary">
            {dailyMeasurement && dailyMeasurement.whenAdded}
            <Link passHref href={`/${router.query.login}/nutrition-diary/${addDaysToDate(router.query.date, 1)}`}><a>Next</a></Link>
            {nutrition_diary && nutrition_diary.map((x, i) => (
                <MealBox
                    index={i}
                    openDialog={() => {
                        setIndex(i)
                        setIsDialogOpen(true)
                    }}
                    products={x}
                    key={i}
                />
            ))}
            <AddProducts index={index} isDialogOpen={isDialogOpen} closeDialog={() => setIsDialogOpen(false)} />
        </div>
    );
};

export default NutritionDiary;
