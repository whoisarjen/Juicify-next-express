import { ResultSchemaProps, ValueSchemaProps } from '../../../schema/workoutResult.schema'
import BaseBoxResult from './BoxResult';
import useBoxResult from './useBoxResult';

export interface BoxResultProps {
    isOwner: boolean,
    result: ResultSchemaProps,
    setNewValues: (arg0: Array<ValueSchemaProps>) => void
    deleteExerciseWithIndex: () => void
}

const BoxResult = ({ result, setNewValues, isOwner, deleteExerciseWithIndex }: BoxResultProps) => {
    const props = useBoxResult({ result, setNewValues, isOwner, deleteExerciseWithIndex })

    return <BaseBoxResult {...props} />
}

export default BoxResult;