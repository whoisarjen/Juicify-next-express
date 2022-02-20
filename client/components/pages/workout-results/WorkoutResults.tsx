import BoxWorkout from '../../common/box-workout'
import NavbarProfile from '../../common/navbar-profile'
import DialogAddWorkoutResult from "../../common/dialog-add-workout-result"
import { useWorkoutResultsProps } from './useWorkoutResults'
import ButtonPlusIcon from '../../common/button-plus-icon'
import NavbarOnlyTitle from '../../common/navbar-only-title'

const BaseWorkoutResults = ({ token, router, data, user }: useWorkoutResultsProps) => {
    return (
        <div>
            {
                token.login == router.query.login ?
                    <>
                        <NavbarOnlyTitle title="workout:WORKOUT_RESULTS" />
                        <DialogAddWorkoutResult>
                            <ButtonPlusIcon />
                        </DialogAddWorkoutResult>
                    </>
                    :
                    <NavbarProfile user={user} tab={2} />
            }
            {
                data?.map((result: any) =>
                    <BoxWorkout
                        whenAdded={result.whenAdded}
                        isNotSaved={result.notSaved}
                        title={result.title}
                        description={result.description}
                        route={`/${router.query.login}/workout/results/${result.whenAdded}/${result._id}`}
                        type={0}
                        key={result._id}
                    />
                )
            }
        </div>
    )
}

export default BaseWorkoutResults;