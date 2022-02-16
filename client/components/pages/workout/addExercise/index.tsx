import { ExerciseSchemaProps } from "../../../../schema/exercise.schema";
import BaseAddExercises from "./AddExercises";
import useAddExercises from "./useAddExercises";

export interface AddExercisesProps {
    isAddDialog: boolean,
    closeDialog: () => void,
    skipThoseIDS: Array<ExerciseSchemaProps>,
    addThoseExercises: (Arg0: Array<ExerciseSchemaProps>) => void
}

const AddExercises = ({ isAddDialog, closeDialog, skipThoseIDS, addThoseExercises }: AddExercisesProps) => {
    const props = useAddExercises({ isAddDialog, closeDialog, skipThoseIDS, addThoseExercises })

    return <BaseAddExercises {...props} />
}

export default AddExercises;