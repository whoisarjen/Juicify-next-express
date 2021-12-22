import { useRouter } from 'next/router'
import Box from '../../../components/workout/Box'
import useTranslation from "next-translate/useTranslation"
import useWorkoutResults from '../../../hooks/useWorkoutResults'
import DialogCreateResult from "../../../components/workout/DialogCreateResult"

const WorkoutResults = () => {
    const router = useRouter()
    const data = useWorkoutResults()
    const { t } = useTranslation('workout')

    return (
        <div className="workoutResults">
            <div className="title">{t('Workout results')}</div>
            <DialogCreateResult />
            {
                data && data.map(result =>
                    <Box
                        whenAdded={result.whenAdded}
                        isNotSaved={result.notSaved}
                        title={result.title}
                        description={result.description}
                        route={`/${router.query.login}/workout-results/${result.whenAdded}/${result._id}`}
                        type={0}
                        key={result._id}
                    />
                )
            }
        </div>
    )
}

export default WorkoutResults
