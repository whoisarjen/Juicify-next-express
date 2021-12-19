import { useRouter } from 'next/router';
import { addIndexedDB } from '../../../utils/indexedDB'
import useWorkoutPlans from '../../../hooks/useWorkoutPlans'

const WorkoutPlans = () => {
    const router = useRouter()
    const data = useWorkoutPlans()

    const createWorkoutPlan = async () => {
        const time = new Date().getTime()
        await addIndexedDB('workout_plan', [{
            _id: 'XD' + time,
            description: "",
            notSAVED: time,
            title: "",
            exercises: []
        }])
        router.push(`/${router.query.login}/workout-plans/XD${time}`)
    }

    return (
        <div className="workoutPlans">
            <button onClick={createWorkoutPlan}>Create</button>
            Workout plans
        </div>
    );
};

export default WorkoutPlans;
