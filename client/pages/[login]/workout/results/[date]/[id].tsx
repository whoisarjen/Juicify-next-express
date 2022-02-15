
import useWorkoutResult from '../../../../../components/pages/workout/result/useWorkoutResult';
import WorkoutResult from '../../../../../components/pages/workout/result';

const WorkoutResultspage = () => {
    const props = useWorkoutResult()

    return <WorkoutResult {...props} />
}

export default WorkoutResultspage;