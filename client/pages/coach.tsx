import Coach from "../components/pages/coach";
import useCoach from "../components/pages/coach/useCoach";

const CoachPage = () => {
    const props = useCoach()

    return <Coach {...props} />
};

export default CoachPage;