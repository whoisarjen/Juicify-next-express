import BoxWorkout from '../../common/box-workout';
import { WorkoutPlanSchemaProps } from '../../../schema/workoutPlan.schema';
import ButtonPlusIcon from '../../common/button-plus-icon';
import NavbarProfile from '../../common/navbar-profile';
import styled from 'styled-components';
import { useWorkoutPlansProps } from './useWorkoutPlans';

const Title = styled.div`
    font-size: 2rem;
    margin-bottom: 10px;
    font-weight: bold;
`

const BaseWorkoutPlans = ({ data, router, token, createWorkoutPlan, user, t }: useWorkoutPlansProps) => {
    return (
        <div>
            {
                router.query.login == token.login ?
                    <>
                        <Title>{t('Workout plans')}</Title>
                        <ButtonPlusIcon click={createWorkoutPlan} />
                    </>
                    :
                    <NavbarProfile user={user} tab={3} />
            }
            {
                data && data.map((plan: WorkoutPlanSchemaProps) =>
                    <BoxWorkout
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
}

export default BaseWorkoutPlans;