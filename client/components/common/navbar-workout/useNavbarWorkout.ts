import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { NavbarWorkoutProp } from "."
import { useAppSelector } from "../../../hooks/useRedux"

const useNavbarWorkout = ({ title, where, isLoading, saveWorkout, deleteWorkout }: NavbarWorkoutProp) => {
    const router = useRouter()
    const { t } = useTranslation('workout')
    const token: any = useAppSelector(state => state.token.value)

    return { title, where, isLoading, saveWorkout, deleteWorkout, router, token, t }
}

export type useNavbarWorkoutProps = ReturnType<typeof useNavbarWorkout>

export default useNavbarWorkout;