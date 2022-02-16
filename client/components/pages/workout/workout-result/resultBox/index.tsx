import { ResultSchemaProps, ValueSchemaProps } from '../../../../../schema/workoutResult.schema'
import BaseResultBox from './ResultBox';
import useResultBox from './useResultBox';

export interface ResultBoxProps {
    isOwner: boolean,
    result: ResultSchemaProps,
    setNewValues: (arg0: Array<ValueSchemaProps>) => void
    openDeleteExercise: () => void
}

const ResultBox = ({ result, setNewValues, isOwner, openDeleteExercise }: ResultBoxProps) => {
    const props = useResultBox({ result, setNewValues, isOwner, openDeleteExercise })

    return <BaseResultBox {...props} />
}

export default ResultBox;