import { expectLoggedIN } from '../hooks/useAuth'

const Coach = () => {
    expectLoggedIN()

    return (
        <div className="coach">
            Coach
        </div>
    );
}
 
export default Coach;