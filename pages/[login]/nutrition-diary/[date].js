import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react'
import { addDaysToDate } from '../../../hooks/useDate'
import { loadDailyMeasurement } from '../../../hooks/useDaily'
import MealBox from "../../../components/nutrition-diary/MealBox";
import AddProducts from '../../../components/nutrition-diary/AddProducts'

const NutritionDiary = () => {
    const router = useRouter()
    const [index, setIndex] = useState(0)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [when, setWhen] = useState(router.query.date)
    const diary = loadDailyMeasurement(when)

    useEffect(async () => setWhen(router.query.date), [router.query.date])

    return (
        <div className="NutritionDiary">
            {diary && diary.whenAdded}
            <Link passHref href={`/${router.query.login}/nutrition-diary/${addDaysToDate(router.query.date, 1)}`}><a>Next</a></Link>
            {[...Array(5)].map((x, i) => (
                <MealBox
                    index={i}
                    openDialog={() => {
                        setIndex(i)
                        setIsDialogOpen(true)
                    }}
                    products={[{ name: "123" }, { name: "234" }, { name: "345" }]}
                    key={i}
                />
            ))}
            <AddProducts index={index} isDialogOpen={isDialogOpen} closeDialog={() => setIsDialogOpen(false)} />
        </div>
    );
};

export default NutritionDiary;
