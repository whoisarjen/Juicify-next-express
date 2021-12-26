import { useRouter } from 'next/router'
import { useAppSelector } from '../../../hooks/useRedux'
import Box from '../../../components/workout/Box'
import useTranslation from "next-translate/useTranslation"
import useWorkoutResults from '../../../hooks/useWorkoutResults'
import DialogCreateResult from "../../../components/workout/DialogCreateResult"
import { FunctionComponent } from 'react'

const WorkoutResults: FunctionComponent = () => {
    const router = useRouter()
    const { t } = useTranslation('workout')
    const { data, user } = useWorkoutResults()
    const token: any = useAppSelector(state => state.token.value)

    return (
        <div className="workoutResults">
            <div className="title">{t('Workout results')}</div>
            {
                token.login == router.query.login &&
                <DialogCreateResult />
            }
            {
                data && data.map((result: any) =>
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
