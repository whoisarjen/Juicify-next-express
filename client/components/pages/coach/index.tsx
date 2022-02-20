import BaseCoach from "./Coach";
import useCoach from "./useCoach";

const Coach = () => {
    const props = useCoach()

    return <BaseCoach {...props} />
};

export default Coach;