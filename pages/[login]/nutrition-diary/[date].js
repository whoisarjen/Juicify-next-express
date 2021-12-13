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
            setNutrition_diary(
                [
                    ...Array(
                        token.meal_number || Math.max.apply(Math, dailyMeasurement.nutrition_diary.map(function (o) {
                            return o.meal;
                        }))
                    )
                ]
                    .fill(dailyMeasurement.nutrition_diary)
            )
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
                    products={nutrition_diary[i]}
                    key={i}
                />
            ))}
            <AddProducts index={index} isDialogOpen={isDialogOpen} closeDialog={() => setIsDialogOpen(false)} />
        </div>
    );
};

export default NutritionDiary;
