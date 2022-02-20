import styled from 'styled-components'
import BoxWorkout from '../../common/box-workout'
import NavbarProfile from '../../common/navbar-profile'
import DialogAddWorkoutResult from "../../common/dialog-add-workout-result"
import { useWorkoutResultsProps } from './useWorkoutResults'

const Title = styled.div`
    font-size: 2rem;
    margin-bottom: 10px;
    font-weight: bold;
`

const BaseWorkoutResults = ({ token, router, t, data, user }: useWorkoutResultsProps) => {
    return (
        <div>
            {
                token?.login == router?.query.login ?
                    <>
                        <Title>{t('Workout results')}</Title>
                        <DialogAddWorkoutResult />
                    </>
                    :
                    <NavbarProfile user={user} tab={2} />
            }
            {
                data?.length > 0 &&
                data.map((result: any) =>
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