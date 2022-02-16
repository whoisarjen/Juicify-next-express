import Coach from "./coach";
import useCoach from "./useCoach";

const CoachComponent = () => {
    const props = useCoach()

    return <Coach {...props} />
};

export default CoachComponent;