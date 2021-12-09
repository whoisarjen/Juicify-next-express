import { expectLoggedIN } from '../hooks/useAuth'

const Workout = () => {
    expectLoggedIN()

    return (
        <div className="workout">
            Workout
        </div>
    );
}
 
export default Workout;