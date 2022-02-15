import useWorkoutPlan from '../../../../components/pages/workout/workout-plan/useWorkoutPlan'
import WorkoutPlan from '../../../../components/pages/workout/workout-plan'

const WorkoutPlanPage = () => {
    const props = useWorkoutPlan()

    return <WorkoutPlan {...props} />
}

export default WorkoutPlanPage