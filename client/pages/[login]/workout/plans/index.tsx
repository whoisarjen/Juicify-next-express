import { useRouter } from 'next/router';
import { addIndexedDB } from '../../../../utils/indexedDB.utils'
import useWorkoutPlans from '../../../../hooks/useWorkoutPlans'
import ButtonPlus from '../../../../components/common/ButtonPlus';
import Box from '../../../../components/workout/Box';
import useTranslation from "next-translate/useTranslation";
import Navbar from '../../../../components/profile/Navbar';
import { useAppSelector } from '../../../../hooks/useRedux';
import { WorkoutPlanSchemaProps } from '../../../../schema/workoutPlan.schema';
import styled from 'styled-components';

const Title = styled.div`
    font-size: 2rem;
    margin-bottom: 10px;
    font-weight: bold;
`

const WorkoutPlans = () => {
    const router = useRouter()
    const { data, user } = useWorkoutPlans()
    const { t } = useTranslation('workout');
    const token: any = useAppSelector(state => state.token.value)

    const createWorkoutPlan = async () => {
        const newWorkoutPlan = { _id: 'XD' + new Date().getTime(), user_ID: token._id }
        await addIndexedDB('workout_plan', [newWorkoutPlan])
        router.push(`/${router.query.login}/workout-plans/${newWorkoutPlan._id}`)
    }

    return (
        <div className="workoutPlans">
            {
                router.query.login == token.login ?
                    (
                        <>
                            <Title>{t('Workout plans')}</Title>
                            <ButtonPlus click={createWorkoutPlan} />
                        </>
                    ) : (
                        <Navbar user={user} tab={3} />
                    )
            }
            {
                data && data.map((plan: WorkoutPlanSchemaProps) =>
                    <Box
                        title={plan.title}
                        description={plan.description}
                        route={`/${router.query.login}/workout/plans/${plan._id}`}
                        type={1}
                        key={plan._id}
                    />
                )
            }
        </div>
    );
};

export default WorkoutPlans;
