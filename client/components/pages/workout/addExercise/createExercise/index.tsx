import BaseCreateExercise from "./CreateExercise";
import useCreateExercise from "./useCreateExercise";

export interface CreateExerciseProps {
    nameOfCreatedExercise: (arg0: string) => void
}

const CreateExercise = ({ nameOfCreatedExercise }: CreateExerciseProps) => {
    const props = useCreateExercise({ nameOfCreatedExercise })

    return <BaseCreateExercise {...props} />
}

export default CreateExercise;