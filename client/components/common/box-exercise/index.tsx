import { ExerciseSchemaProps } from "../../../schema/exercise.schema";
import BaseBoxExercise from "./BoxExercise";
import useBoxExercise from "./useBoxExercise";

export interface BoxExerciseProps {
    exercise: ExerciseSchemaProps,
    refreshCheckedExercises: () => void
}

const BoxExercise = ({ exercise, refreshCheckedExercises }: BoxExerciseProps) => {
    const props = useBoxExercise({ exercise, refreshCheckedExercises })

    return <BaseBoxExercise {...props}/>
}

export default BoxExercise;