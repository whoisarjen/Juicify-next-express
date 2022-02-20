import useWorkoutResults from "./useWorkoutResults"
import BaseWorkoutResults from "./WorkoutResults"

const WorkoutResults = () => {
    const props = useWorkoutResults()

    return <BaseWorkoutResults {...props} />
}

export default WorkoutResults
