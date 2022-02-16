import { ExerciseSchemaProps } from '../../../../../schema/exercise.schema';
import useWorkoutResultMoreOptions from './useWorkoutResultMoreOptions';
import BaseWorkoutResultMoreOptions from './WorkoutResultMoreOptions';

export interface WorkoutResultMoreOptionsProps {
    exercises: Array<ExerciseSchemaProps>,
    setExercises: (arg0: Array<ExerciseSchemaProps>) => void
}

const WorkoutResultMoreOptions = ({ exercises, setExercises }: WorkoutResultMoreOptionsProps) => {
    const props = useWorkoutResultMoreOptions({ exercises, setExercises })
    
    return <BaseWorkoutResultMoreOptions {...props} />
}

export default WorkoutResultMoreOptions;