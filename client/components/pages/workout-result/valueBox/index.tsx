import { ValueSchemaProps } from "../../../../schema/workoutResult.schema";
import useValueBox from "./useValueBox";
import BaseValueBox from "./ValueBox";

export interface ValueBoxProps {
    value: ValueSchemaProps,
    index: number,
    changeResult: (arg0: ValueSchemaProps) => void,
    deleteResult: () => void,
    isOwner: boolean,
}

const ValueBox = ({ value, index, changeResult, deleteResult, isOwner }: ValueBoxProps) => {
    const props = useValueBox({ value, index, changeResult, deleteResult, isOwner })

    return <BaseValueBox {...props} />
}

export default ValueBox;