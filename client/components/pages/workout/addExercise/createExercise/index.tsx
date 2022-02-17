import BaseCreateExercise from "./CreateExercise";
import useCreateExercise from "./useCreateExercise";

export interface CreateExerciseProps {
    closeCreateExercise: () => void,
    isCreateExercise: boolean,
    created: (arg0: string) => void
}

const CreateExercise = ({ closeCreateExercise, isCreateExercise, created }: CreateExerciseProps) => {
    const props = useCreateExercise({ closeCreateExercise, isCreateExercise, created })

    return <BaseCreateExercise {...props} />
}

export default CreateExercise;