import { ValueSchemaProps } from "../../../schema/workoutResult.schema";
import useBoxValue from "./useBoxValue";
import BaseBoxValue from "./BoxValue";

export interface BoxValueProps {
    value: ValueSchemaProps,
    index: number,
    changeResult: (arg0: ValueSchemaProps) => void,
    deleteResult: () => void,
    isOwner: boolean,
}

const BoxValue = ({ value, index, changeResult, deleteResult, isOwner }: BoxValueProps) => {
    const props = useBoxValue({ value, index, changeResult, deleteResult, isOwner })

    return <BaseBoxValue {...props} />
}

export default BoxValue;