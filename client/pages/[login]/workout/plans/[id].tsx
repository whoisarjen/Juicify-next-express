import useWorkoutPlan from '../../../../components/pages/workout/plan/useWorkoutPlan'
import WorkoutPlan from '../../../../components/pages/workout/plan'

const WorkoutPlanPage = () => {
    const props = useWorkoutPlan()

    return <WorkoutPlan {...props} />
}

export default WorkoutPlanPage