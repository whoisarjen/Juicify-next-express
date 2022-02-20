import { ExerciseSchemaProps } from "../../../schema/exercise.schema";
import BaseAddExercises from "./AddExercises";
import useAddExercises from "./useAddExercises";

export interface AddExercisesProps {
    children?: any,
    skipThoseIDS: Array<ExerciseSchemaProps>,
    addThoseExercises: (Arg0: Array<ExerciseSchemaProps>) => void,
}

const AddExercises = ({ children, skipThoseIDS, addThoseExercises }: AddExercisesProps) => {
    const props = useAddExercises({ children, skipThoseIDS, addThoseExercises })

    return <BaseAddExercises {...props} />
}

export default AddExercises;