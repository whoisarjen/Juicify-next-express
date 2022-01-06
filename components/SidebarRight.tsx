import { FunctionComponent, useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useDailyMeasurement } from "../hooks/useDailyMeasurement";
import useMacro from "../hooks/useMacro";
import { useAppSelector } from "../hooks/useRedux";
import { getDiffrentBetweenDays, getShortDate, reverseDateDotes } from "../utils/manageDate";
import countCalories from "./nutrition-diary/utils/countCalories";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Link from "next/link";
import ListSubheader from '@mui/material/ListSubheader';
import useTranslation from "next-translate/useTranslation";

const SidebarRight: FunctionComponent = () => {
    const { t } = useTranslation('home')
    const [{ data }, reload] = useDailyMeasurement(getShortDate())
    const token: any = useAppSelector(state => state.token.value)
    const keyDaily = useAppSelector(state => state.key.daily_measurement)
    const [getDay] = useMacro()
    const [weight, setWeight] = useState(0)
    const [calories, setCalories] = useState(0)
    const [caloriesGoal, setCaloriesGoal] = useState(0)
    const [workout, setWorkout] = useState(0)
    const [coach, setCoach] = useState(0)
    const [styles, setStyles]: any = useState()

    useEffect(() => {
        if (data && token) {
            setWeight(data.weight)

            let calories = 0
            data.nutrition_diary.forEach(x => {
                calories += parseInt(countCalories(x).toString())
            })
            setCalories(calories)

            const macro = getDay(getShortDate(), token)
            setCaloriesGoal(macro.proteins * 4 + macro.carbs * 4 + macro.fats * 9)

            setWorkout(data.workout_result.length)

            setCoach(getDiffrentBetweenDays(token.coach, getShortDate()))

            setStyles(buildStyles({
                textSize: '15px',
                pathTransitionDuration: 0.5,
                pathColor: 'rgba(25, 118, 210, 1',
                textColor: 'rgba(122, 122, 122, 1',
                trailColor: '#d6d6d6',
                backgroundColor: '#3e98c7',
            }))
        }
    }, [data, token])

    useEffect(() => reload(), [keyDaily])

    return (
        <div id="sidebarRight">
            {
                styles &&
                <>
                    <List
                        sx={{ width: '100%', bgcolor: 'background.paper' }}
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                {t('Data for')} {reverseDateDotes()}:
                            </ListSubheader>
                        }
                    >
                        <ListItemButton>
                            <Link href={`/coach`}>
                                <a>
                                    <div className="sidebarRightCircleBox">
                                        <CircularProgressbar
                                            value={weight ? 100 : 0}
                                            text={`${weight}kg`}
                                            styles={styles}
                                        />
                                        <div>
                                            Waga
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </ListItemButton>
                        <ListItemButton>
                            <Link href={`/${token.login}/nutrition-diary/${getShortDate()}`}>
                                <a>
                                    <div className="sidebarRightCircleBox">
                                        <CircularProgressbar
                                            value={calories ? calories / caloriesGoal * 100 : 0}
                                            text={`${calories}Kcal`}
                                            styles={styles}
                                        />
                                        <div>
                                            Kalorie
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </ListItemButton>
                        <ListItemButton>
                            <Link href={`/${token.login}/workout-results/`}>
                                <a>
                                    <div className="sidebarRightCircleBox">
                                        <CircularProgressbar
                                            value={workout * 100}
                                            text={`${workout}`}
                                            styles={styles}
                                        />
                                        <div>
                                            Trening
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </ListItemButton>
                        <ListItemButton>
                            <Link href={`/coach`}>
                                <a>
                                    <div className="sidebarRightCircleBox">
                                        <CircularProgressbar
                                            value={(coach - 7) / 7 * 100}
                                            text={`${coach >= 0 ? coach : 0}dni`}
                                            styles={styles}
                                        />
                                        <div>
                                            Trener
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </ListItemButton>
                    </List>
                </>
            }
        </div>
    )
}

export default SidebarRight;