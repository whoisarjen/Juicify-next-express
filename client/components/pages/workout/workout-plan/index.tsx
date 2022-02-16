import useWorkoutPlan from "./useWorkoutPlan";
import BaseWorkoutPlan from "./WorkoutPlan";

const WorkoutPlan = () => {
    const props = useWorkoutPlan()
    
    return <BaseWorkoutPlan {...props}/>
}

export default WorkoutPlan;