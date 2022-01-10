import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { FunctionComponent, useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import useMacro from "../../hooks/useMacro";
import { useAppSelector } from "../../hooks/useRedux";
import { useTheme } from "../../hooks/useTheme";
import countCalories from './utils/countCalories'

interface CircularWithLabelProps {
    array: Array<any>
}

const CircularWithLabel: FunctionComponent<CircularWithLabelProps> = ({ array }) => {
    const [calories, setCalories] = useState(0)
    const [progress, setProgress] = useState(0)
    const token = useAppSelector(state => state.token.value)
    const router = useRouter()
    const [getDay] = useMacro()
    const [getTheme]: any = useTheme()
    const { t } = useTranslation('nutrition-diary')
    const macro = getDay(router.query.date, token)

    useEffect(() => {
        if (array) {
            let count: any = 0;
            if (array.length > 0) {
                for (let i = 0; i < array.length; i++) {
                    if (array[i].length > 0) {
                        for (let a = 0; a < array[i].length; a++) {
                            count += countCalories(array[i][a])
                        }
                    }
                }
            }
            setCalories(count)
            setProgress(count / parseInt((macro.proteins * 4 + macro.carbs * 4 + macro.fats * 9).toString()) * 100)
        }
    }, [array, token, macro])

    return (
        <div style={{ width: '100%', height: '100%', display: 'grid' }}>
            <div style={{ maxWidth: '110px', maxHeight: '110px', margin: 'auto' }}>
                <CircularProgressbar
                    value={progress}
                    text={`${calories}${t('Kcal')}`}
                    styles={buildStyles({
                        textSize: '15px',
                        pathTransitionDuration: 0.5,
                        pathColor: getTheme('PRIMARY'),
                        textColor: 'rgba(122, 122, 122, 1',
                        trailColor: '#d6d6d6',
                        backgroundColor: getTheme('PRIMARY'),
                    })}
                />
            </div>
        </div>
    )
}

export default CircularWithLabel;