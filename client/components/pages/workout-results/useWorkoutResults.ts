import { useRouter } from "next/router"
import { useAppSelector } from "../../../hooks/useRedux"
import useGetWorkoutResults from "../../../hooks/useGetWorkoutResults"

const useWorkoutResults = () => {
    const router = useRouter()
    const { data, user } = useGetWorkoutResults()
    const token: any = useAppSelector(state => state.token.value)

    return { router, data, user, token }
}

export type useWorkoutResultsProps = ReturnType<typeof useWorkoutResults>

export default useWorkoutResults;