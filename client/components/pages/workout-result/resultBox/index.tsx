import { ResultSchemaProps, ValueSchemaProps } from '../../../../schema/workoutResult.schema'
import BaseResultBox from './ResultBox';
import useResultBox from './useResultBox';

export interface ResultBoxProps {
    isOwner: boolean,
    result: ResultSchemaProps,
    setNewValues: (arg0: Array<ValueSchemaProps>) => void
    deleteExerciseWithIndex: () => void
}

const ResultBox = ({ result, setNewValues, isOwner, deleteExerciseWithIndex }: ResultBoxProps) => {
    const props = useResultBox({ result, setNewValues, isOwner, deleteExerciseWithIndex })

    return <BaseResultBox {...props} />
}

export default ResultBox;