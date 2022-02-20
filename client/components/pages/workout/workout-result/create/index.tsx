import BaseCreateWorkoutResult from "./CreateWorkoutResult"
import useCreateWorkoutResult from "./useCreateWorkoutResult"

const CreateWorkoutResult = () => {
    const props = useCreateWorkoutResult()

    return <BaseCreateWorkoutResult {...props} />
}

export default CreateWorkoutResult