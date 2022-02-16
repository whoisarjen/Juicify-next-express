import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useState } from "react"
import { WorkoutNavbarProp } from "."
import { useAppSelector } from "../../../../hooks/useRedux"

const useWorkoutNavbar = ({ title, where, isLoading, saveWorkout, deleteWorkout }: WorkoutNavbarProp) => {
    const [isDialog, setIsDialog] = useState(false)
    const router = useRouter()
    const { t } = useTranslation('workout')
    const token: any = useAppSelector(state => state.token.value)

    return { title, where, isLoading, saveWorkout, deleteWorkout, router, token, isDialog, setIsDialog, t }
}

export type useWorkoutNavbarProps = ReturnType<typeof useWorkoutNavbar>

export default useWorkoutNavbar;