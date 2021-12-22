import { useRouter } from 'next/router';
import { addIndexedDB } from '../../../utils/indexedDB'
import useWorkoutPlans from '../../../hooks/useWorkoutPlans'
import Spinner from '../../../components/common/Spinner';
import ButtonPlus from '../../../components/common/ButtonPlus';
import Box from '../../../components/workout/Box';
import useTranslation from "next-translate/useTranslation";

const WorkoutPlans = () => {
    const router = useRouter()
    const { data, user } = useWorkoutPlans()
    const { t } = useTranslation('workout');

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
            <div className="title">{t('Workout plans')}</div>
            <ButtonPlus click={createWorkoutPlan} />
            {
                data === false
                    ?
                    <Spinner />
                    :
                    data && data.map(plan =>
                        <Box
                            title={plan.title}
                            description={plan.description}
                            route={`/${router.query.login}/workout-plans/${plan._id}`}
                            type={1}
                            key={plan._id}
                        />
                    )
            }
        </div>
    );
};

export default WorkoutPlans;
