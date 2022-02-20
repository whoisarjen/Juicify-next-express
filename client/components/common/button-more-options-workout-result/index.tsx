import { ExerciseSchemaProps } from '../../../schema/exercise.schema';
import useButtonMoreOptionsWorkoutResult from './useButtonMoreOptionsWorkoutResult';
import BaseButtonMoreOptionsWorkoutResult from './ButtonMoreOptionsWorkoutResult';

export interface ButtonMoreOptionsWorkoutResultProps {
    exercises: Array<ExerciseSchemaProps>,
    setExercises: (arg0: Array<ExerciseSchemaProps>) => void
}

const ButtonMoreOptionsWorkoutResult = ({ exercises, setExercises }: ButtonMoreOptionsWorkoutResultProps) => {
    const props = useButtonMoreOptionsWorkoutResult({ exercises, setExercises })
    
    return <BaseButtonMoreOptionsWorkoutResult {...props} />
}

export default ButtonMoreOptionsWorkoutResult;