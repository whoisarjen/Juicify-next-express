import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useDailyMeasurements } from "../../../hooks/useDailyMeasurements"
import { useTheme } from "../../../hooks/useTheme"
import { DailyMeasurementSchemaProps } from "../../../schema/dailyMeasurement.schema"
import { addDaysToDate, getShortDate, reverseDateDotes } from "../../../utils/date.utils"
import { getCalories } from "../../../utils/product.utils"

const useProfile = () => {
    const { getTheme } = useTheme()
    const { t } = useTranslation('profile')
    const router: any = useRouter()
    const { data, user } = useDailyMeasurements(addDaysToDate(getShortDate(), -1), 7, router.query.login)

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

    const nutrition_diary = data.map((x: DailyMeasurementSchemaProps) => {
        let object: any = {
            name: '',
            [t('p')]: 0,
            [t('c')]: 0,
            [t('f')]: 0
        }
        if (x.nutrition_diary && x.nutrition_diary.length) {
            object.name = reverseDateDotes(x.whenAdded).slice(0, 5)
            x.nutrition_diary.map((meal: any) => {

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
    }).reverse()

    const calories = data.map((x: DailyMeasurementSchemaProps) => {
        let object: any = {
            name: '',
            [t('Calories')]: 0,
            [t('Burnt')]: 0,
            [t('Diffrent')]: 0
        }
        if (x.nutrition_diary && x.nutrition_diary.length) {
            object.name = reverseDateDotes(x.whenAdded).slice(0, 5)
            x.nutrition_diary.map((meal: any) => {
                if (meal.calories) {
                    if (meal.calories > 0) {
                        object[t('Calories')] = meal.calories
                    } else {
                        object[t('Burnt')] = meal.calories
                    }
                } else {
                    object[t('Calories')] += getCalories(meal)
                }
            })
            object[t('Diffrent')] = object[t('Calories')] + object[t('Burnt')]
        }
        return object
    }).reverse()

    return { getTheme, barNamesWithColor, barNamesWithColorCalories, user, calories, nutrition_diary, t }
}

export type useProfileProps = ReturnType<typeof useProfile>

export default useProfile;