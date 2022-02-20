import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useDailyMeasurement } from "../../hooks/useDailyMeasurement";
import { getDiffrentBetweenDays, getShortDate, reverseDateDotes } from "../../utils/date.utils";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListSubheader from '@mui/material/ListSubheader';
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useTheme } from "../../hooks/useTheme";
import { getCalories } from "../../utils/product.utils";
import styled from 'styled-components'
import { getMacroByDay } from "../../utils/user.utils";
import BetterLink from "../common/better-link";
import AddWeight from "../common/dialog-add-weight";

const Box = styled.aside`
    padding: 12px;
    @media (max-width: 1105px) {
        display: none;
    }
`

const CircularBox = styled.aside`
    padding: 6px;
    display: grid;
    grid-template-columns: 80px auto;
    height: 80px;
    ${this} div {
        margin: auto 12px;
    }
    ${this} .CircularProgressbar-text {
        dominant-baseline: middle !important;
        text-anchor: middle !important;
        font-size: 15px !important;
    }
`


const SidebarRight = ({ token }: { token: any }) => {
    const router = useRouter()
    const { t } = useTranslation('home')
    const { data } = useDailyMeasurement(getShortDate(), token.login)
    const [weight, setWeight] = useState(0)
    const [calories, setCalories] = useState(0)
    const [caloriesGoal, setCaloriesGoal] = useState(0)
    const [workout, setWorkout] = useState(0)
    const [coach, setCoach] = useState(0)
    const [styles, setStyles]: any = useState()
    const { getTheme } = useTheme()

    useEffect(() => {
        if (data && token) {
            setWeight(data.weight || 0)

            let calories = 0
            if (data?.nutrition_diary?.length) {
                for (let i = 0; i < data.nutrition_diary.length; i++) {
                    calories += getCalories(data.nutrition_diary[i] as any)
                }
            }
            setCalories(calories)

            const macro = getMacroByDay(new Date(getShortDate()), token)
            setCaloriesGoal(macro.proteins * 4 + macro.carbs * 4 + macro.fats * 9)

            setWorkout(data.workout_result ? data.workout_result.length : 0)

            setCoach(getDiffrentBetweenDays(token.coach, getShortDate()))

            setStyles(buildStyles({
                textSize: '15px',
                pathTransitionDuration: 0.5,
                pathColor: getTheme('PRIMARY'),
                textColor: 'rgba(122, 122, 122, 1',
                trailColor: '#d6d6d6',
                backgroundColor: getTheme('PRIMARY')
            }))
        }
    }, [data, token])

    return (
        <Box>
            {
                styles &&
                <List
                    sx={{ width: '100%', bgcolor: 'background.paper' }}
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            {t('Data for')} {reverseDateDotes()}:
                        </ListSubheader>
                    }
                >
                    <BetterLink href={`${router.asPath}`}>
                        <AddWeight>
                            <ListItemButton>
                                <CircularBox>
                                    <CircularProgressbar
                                        value={weight ? 100 : 0}
                                        text={`${weight}kg`}
                                        styles={styles}
                                    />
                                    <div>
                                        {t("Weight")}
                                    </div>
                                </CircularBox>
                            </ListItemButton>
                        </AddWeight>
                    </BetterLink>
                    <BetterLink href={`/${token.login}/nutrition-diary/${getShortDate()}`}>
                        <ListItemButton>
                            <CircularBox>
                                <CircularProgressbar
                                    value={calories ? calories / caloriesGoal * 100 : 0}
                                    text={`${calories}Kcal`}
                                    styles={styles}
                                />
                                <div>
                                    {t("Calories")}
                                </div>
                            </CircularBox>
                        </ListItemButton>
                    </BetterLink>
                    <BetterLink href={`/${token.login}/workout/results/`}>
                        <ListItemButton>
                            <CircularBox>
                                <CircularProgressbar
                                    value={workout * 100}
                                    text={`${workout}`}
                                    styles={styles}
                                />
                                <div>
                                    {t("Workout")}
                                </div>
                            </CircularBox>
                        </ListItemButton>
                    </BetterLink>
                    <BetterLink href={`/coach`}>
                        <ListItemButton>
                            <CircularBox>
                                <CircularProgressbar
                                    value={(7 - coach) / 7 * 100}
                                    text={`${coach >= 0 ? coach : 0}dni`}
                                    styles={styles}
                                />
                                <div>
                                    {t("Coach")}
                                </div>
                            </CircularBox>
                        </ListItemButton>
                    </BetterLink>
                </List>
            }
        </Box>
    )
}

export default SidebarRight;