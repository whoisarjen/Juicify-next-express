import useTranslation from "next-translate/useTranslation";
import { BoxWorkoutProps } from ".";
import { useTheme } from "../../../hooks/useTheme";

const useBoxWorkout = ({ title, description, route, type, isNotSaved, whenAdded }: BoxWorkoutProps) => {
    const { t } = useTranslation('workout');
    const { getTheme } = useTheme()

    return { title, description, route, type, isNotSaved, whenAdded, getTheme, t }
}

export type useBoxWorkoutProps = ReturnType<typeof useBoxWorkout>

export default useBoxWorkout;