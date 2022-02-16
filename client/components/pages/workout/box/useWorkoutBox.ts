import useTranslation from "next-translate/useTranslation";
import { WorkoutBoxProps } from ".";
import { useTheme } from "../../../../hooks/useTheme";

const useWorkoutBox = ({ title, description, route, type, isNotSaved, whenAdded }: WorkoutBoxProps) => {
    const { t } = useTranslation('workout');
    const { getTheme } = useTheme()

    return { title, description, route, type, isNotSaved, whenAdded, getTheme, t }
}

export type useWorkoutBoxProps = ReturnType<typeof useWorkoutBox>

export default useWorkoutBox;