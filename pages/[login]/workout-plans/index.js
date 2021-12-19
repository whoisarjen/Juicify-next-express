import { useRouter } from 'next/router';
import { addIndexedDB } from '../../../utils/indexedDB'
import useWorkoutPlans from '../../../hooks/useWorkoutPlans'
import Spinner from '../../../components/common/Spinner';
import Link from 'next/link'

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
            {
                data === false
                    ?
                    <Spinner />
                    :
                    data && data.map(plan =>
                        <Link href={`/${router.query.login}/workout-plans/${plan._id}`} key={plan._id}>
                            <a>
                                <div className="workoutPlansBox">
                                    {plan._id}
                                </div>
                            </a>
                        </Link>
                    )
            }
        </div>
    );
};

export default WorkoutPlans;
