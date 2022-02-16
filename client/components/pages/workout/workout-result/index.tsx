import useWorkoutResult from "./useWorkoutResult";
import BaseWorkoutResults from "./WorkoutResult";

const WorkoutResults = () => {
    const props = useWorkoutResult()

    return <BaseWorkoutResults {...props} />
}

export default WorkoutResults;