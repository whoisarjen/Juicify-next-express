import { ExerciseSchemaProps } from "../../../schema/exercise.schema";
import BaseDialogAddExercise from "./DialogAddExercise";
import useDialogAddExercise from "./useDialogAddExercise";

export interface DialogAddExerciseProps {
    children?: any,
    skipThoseIDS: Array<ExerciseSchemaProps>,
    addThoseExercises: (Arg0: Array<ExerciseSchemaProps>) => void,
}

const DialogAddExercise = ({ children, skipThoseIDS, addThoseExercises }: DialogAddExerciseProps) => {
    const props = useDialogAddExercise({ children, skipThoseIDS, addThoseExercises })

    return <BaseDialogAddExercise {...props} />
}

export default DialogAddExercise;