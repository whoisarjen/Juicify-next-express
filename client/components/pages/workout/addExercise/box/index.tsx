import { ExerciseSchemaProps } from "../../../../../schema/exercise.schema";
import BaseAddExercisesBox from "./AddExercisesBox";
import useAddExercisesBox from "./useAddExerciseBox";

export interface AddExercisesBoxProps {
    exercise: ExerciseSchemaProps,
    refreshCheckedExercises: () => void
}

const AddExercisesBox = ({ exercise, refreshCheckedExercises }: AddExercisesBoxProps) => {
    const props = useAddExercisesBox({ exercise, refreshCheckedExercises })

    return <BaseAddExercisesBox {...props}/>
}

export default AddExercisesBox;