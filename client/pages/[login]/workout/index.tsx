import Box from "../../../components/common/box-workout";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

const Workout = () => {
    const { t } = useTranslation('workout');
    const router: any = useRouter()

    return (
        <div>
            <Box
                title={t('WORKOUT_RESULTS')}
                description={t('WORKOUT_RESULTS_DESCRIPTION')}
                route={`/${router.query.login}/workout/results`}
                type={0}
            />
            <Box
                title={t('WORKOUT_PLANS')}
                description={t('WORKOUT_PLANS_DESCRIPTION')}
                route={`/${router.query.login}/workout/plans`}
                type={1}
            />
        </div>
    );
};

export default Workout;
