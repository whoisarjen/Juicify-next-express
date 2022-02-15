import Coach from "../components/coach";
import useCoach from "../components/coach/useCoach";

const CoachPage = () => {
    const props = useCoach()

    return <Coach {...props} />
};

export default CoachPage;