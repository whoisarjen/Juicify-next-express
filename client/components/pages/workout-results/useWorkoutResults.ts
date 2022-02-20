import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useAppSelector } from "../../../hooks/useRedux"
import useGetWorkoutResults from "./useGetWorkoutResults"

const useWorkoutResults = () => {
    const router = useRouter()
    const { t } = useTranslation('workout')
    const { data, user } = useGetWorkoutResults()
    const token: any = useAppSelector(state => state.token.value)

    return { router, data, user, t, token }
}

export type useWorkoutResultsProps = ReturnType<typeof useWorkoutResults>

export default useWorkoutResults;