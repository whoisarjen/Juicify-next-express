import { useRouter } from 'next/router';
import { addIndexedDB } from '../../../utils/indexedDB'
import useWorkoutPlans from '../../../hooks/useWorkoutPlans'
import Spinner from '../../../components/common/Spinner';
import ButtonPlus from '../../../components/common/ButtonPlus';
import Box from '../../../components/workout/Box';
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from 'react';
import Navbar from '../../../components/profile/Navbar';
import { useAppSelector } from '../../../hooks/useRedux';
import WorkoutPlan from '../../../classes/workout/workoutPlan';
import WorkoutPlanProps from '../../../interfaces/workout/workoutPlan';

const WorkoutPlans: FunctionComponent = () => {
    const router = useRouter()
    const { data, user } = useWorkoutPlans()
    const { t } = useTranslation('workout');
    const token: any = useAppSelector(state => state.token.value)

    const createWorkoutPlan = async () => {
        const newWorkoutPlan = new WorkoutPlan({ _id: 'XD' + new Date().getTime(), user_ID: token._id })
        await addIndexedDB('workout_plan', [newWorkoutPlan])
        router.push(`/${router.query.login}/workout-plans/${newWorkoutPlan._id}`)
    }

    return (
        <div className="workoutPlans">
            {
                router.query.login == token.login ?
                    (
                        <>
                            <div className="title">{t('Workout plans')}</div>
                            <ButtonPlus click={createWorkoutPlan} />
                        </>
                    ) : (
                        <Navbar user={user} tab={3} />
                    )
            }
            {
                data === false
                    ?
                    <Spinner />
                    :
                    data && data.map((plan: WorkoutPlanProps) =>
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
