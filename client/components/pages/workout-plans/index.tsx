import useWorkoutPlans from "./useWorkoutPlans";
import BaseWorkoutPlans from "./WorkoutPlans";

const WorkoutPlans = () => {
    const props = useWorkoutPlans()

    return <BaseWorkoutPlans {...props} />
};

export default WorkoutPlans;
