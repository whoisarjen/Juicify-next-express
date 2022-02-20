import Box from "../../../components/pages/workout/box";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

const Workout = () => {
    const { t } = useTranslation('workout');
    const router: any = useRouter()

    return (
        <div className="workout">
            <Box
                title={t('Workout results')}
                description={t('Workout results descirption')}
                route={`/${router.query.login}/workout/results`}
                type={0}
            />
            <Box
                title={t('Workout plans')}
                description={t('Workout plans descirption')}
                route={`/${router.query.login}/workout/plans`}
                type={1}
            />
        </div>
    );
};

export default Workout;
