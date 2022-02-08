import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import SimpleLineChart from "../../components/diagrams/SimpleLineChart";
import StackedBarChart from "../../components/diagrams/StackedBarChart";
import Navbar from "../../components/profile/Navbar";
import { useDailyMeasurements } from "../../hooks/useDailyMeasurements";
import { useTheme } from "../../hooks/useTheme";
import DailyMeasurementProps from "../../interfaces/dailyMeasurement.interface";
import NutritionDiaryProps from "../../interfaces/nutritionDiary.interface";
import styles from '../../styles/profile.module.css'
import { addDaysToDate, getShortDate, reverseDateDotes } from '../../utils/date.utils';
import { getCalories } from "../../utils/product.utils";

const Profile: FunctionComponent = () => {
    const [getTheme]: any = useTheme()
    const { t } = useTranslation('profile')
    const router: any = useRouter()
    const [{ data, user }]: any = useDailyMeasurements(addDaysToDate(getShortDate(), -1), 7, router.query.login)
    const barNamesWithColor = [
        { dataKey: t('p'), fill: '#ff8b42' },
        { dataKey: t('c'), fill: '#ffbb33' },
        { dataKey: t('f'), fill: '#90c253' }
    ]
    const barNamesWithColorCalories = [
        { dataKey: t('Calories'), stroke: '#ff8b42' },
        { dataKey: t('Burnt'), stroke: '#b1272f' },
        { dataKey: t('Diffrent'), stroke: getTheme('PRIMARY') }
    ]
    const nutrition_diary = data.map((x: DailyMeasurementProps) => {
        let object: any = {
            name: '',
            [t('p')]: 0,
            [t('c')]: 0,
            [t('f')]: 0
        }
        if (x.nutrition_diary) {
            object.name = reverseDateDotes(x.whenAdded).slice(0, 5)
            x.nutrition_diary.map((meal: NutritionDiaryProps) => {
                if (meal && meal.how_many) {
                    if (meal.p) {
                        object[t('p')] += meal.p * meal.how_many
                    }
                    if (meal.c) {
                        object[t('c')] += meal.c * meal.how_many
                    }
                    if (meal.f) {
                        object[t('f')] += meal.f * meal.how_many
                    }
                }
            })
        }
        return object
    })

    const calories = data.map((x: DailyMeasurementProps) => {
        let object: any = {
            name: '',
            [t('Calories')]: 0,
            [t('Burnt')]: 0,
            [t('Diffrent')]: 0
        }
        if (x.nutrition_diary) {
            object.name = reverseDateDotes(x.whenAdded).slice(0, 5)
            x.nutrition_diary.map(async (meal: NutritionDiaryProps) => {
                if (meal.calories) {
                    if (meal.calories > 0) {
                        object[t('Calories')] = meal.calories
                    } else {
                        object[t('Burnt')] = meal.calories
                    }
                } else {
                    object[t('Calories')] += await getCalories(meal)
                }
            })
            object[t('Diffrent')] = object[t('Calories')] + object[t('Burnt')]
        }
        return object
    })

    return (
        <>
            {
                user &&
                <>
                    <Navbar user={user} tab={0} />
                    <h3 style={{ color: getTheme('PRIMARY') }}>{t('Daily calories')}</h3>
                    <div className={styles.profileBox}>
                        <SimpleLineChart data={calories.reverse()} barNamesWithColor={barNamesWithColorCalories} />
                    </div>
                    <h3 style={{ color: getTheme('PRIMARY') }}>{t("Daily macronutrients")}</h3>
                    <div className={styles.profileBox}>
                        <StackedBarChart data={nutrition_diary.reverse()} barNamesWithColor={barNamesWithColor} />
                    </div>
                </>
            }
        </>
    );
};

export default Profile;
