import Link from "next/link";
import { useRouter } from "next/router";
import MealBox from "../../../components/nutrition-diary/MealBox";
import AddProducts from '../../../components/nutrition-diary/AddProducts'
import { useState, useEffect } from 'react'
import { useCookies } from "react-cookie"
import { useSelector } from "react-redux"
import { readToken } from "../../../hooks/useAuth"
import { getIndexedDBbyID } from "../../../hooks/useIndexedDB"
import { addDaysToDate } from '../../../hooks/useDate'

const NutritionDiary = () => {
    const router = useRouter()
    const [cookies] = useCookies()
    const [diary, setDiary] = useState()
    const [index, setIndex] = useState(0)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const range = useSelector(state => state.config.range())

    const loadDailyMeasurementFromAPI = async () => {
        return {
            whenAdded: router.query.date,
            user_ID: null,
            nutrition_diary: [],
            workout_result: []
        }
    }

    useEffect(async () => {
        if (cookies.token) {
            const token = readToken(cookies.token)
            if (token.login == router.query.login) {
                if (range <= router.query.date) {
                    let daily = await getIndexedDBbyID('daily_measurement', router.query.date)
                    if (!daily) {
                        console.log('creating')
                        daily = {
                            whenAdded: router.query.date,
                            user_ID: token._id,
                            nutrition_diary: [],
                            workout_result: []
                        }
                    }
                    setDiary(daily)
                } else {
                    console.log('Not in range')
                    setDiary(await loadDailyMeasurementFromAPI())
                }
            } else {
                console.log('Guest')
                setDiary(await loadDailyMeasurementFromAPI())
            }
        }
    }, [cookies.token, router.query.date])

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
