import useTranslation from "next-translate/useTranslation";
import DialogCreateResult from "../../../components/workout/DialogCreateResult";

const WorkoutResults = () => {
    const { t } = useTranslation('workout');

    return (
        <div className="workoutResults">
            <div className="title">{t('Workout results')}</div>
            <DialogCreateResult />
        </div>
    );
};

export default WorkoutResults;
