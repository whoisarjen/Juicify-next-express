import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { WorkoutNavbarProp } from "."
import { useAppSelector } from "../../../hooks/useRedux"

const useWorkoutNavbar = ({ title, where, isLoading, saveWorkout, deleteWorkout }: WorkoutNavbarProp) => {
    const router = useRouter()
    const { t } = useTranslation('workout')
    const token: any = useAppSelector(state => state.token.value)

    return { title, where, isLoading, saveWorkout, deleteWorkout, router, token, t }
}

export type useWorkoutNavbarProps = ReturnType<typeof useWorkoutNavbar>

export default useWorkoutNavbar;