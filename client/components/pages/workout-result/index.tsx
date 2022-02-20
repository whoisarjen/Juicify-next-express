import useWorkoutResult from "./useWorkoutResult";
import BaseWorkoutResult from "./WorkoutResult";

const WorkoutResult = () => {
    const props = useWorkoutResult()

    return <BaseWorkoutResult {...props} />
}

export default WorkoutResult;