import { useAppSelector } from '../hooks/useRedux';
import Box from '../components/workout/Box'
import useTranslation from "next-translate/useTranslation";

const Workout = () => {
    const { t } = useTranslation('workout');
    const token: any = useAppSelector(state => state.token.value)

    return (
        <div className="workout">
            <Box
                title={t('Workout results')}
                description={t('Workout results descirption')}
                route={`/${token.login}/workout-results`}
                type={0}
            />
            <Box
                title={t('Workout plans')}
                description={t('Workout plans descirption')}
                route={`/${token.login}/workout-plans`}
                type={1}
            />
        </div>
    );
};

export default Workout;
