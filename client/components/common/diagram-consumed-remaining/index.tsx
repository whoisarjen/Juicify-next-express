import { ProductSchemaProps } from "../../../schema/product.schema";
import BaseDiagramConsumedRemaining from "./DiagramConsumedRemaining";
import useDiagramConsumedRemaining from "./useDiagramConsumedRemaining";

export interface DiagramConsumedRemainingProps {
    array: Array<Array<ProductSchemaProps>>,
    user: any
}

const DiagramConsumedRemaining = ({ array, user }: DiagramConsumedRemainingProps) => {
    const props = useDiagramConsumedRemaining({ array, user })

    return <BaseDiagramConsumedRemaining {...props} /> 
}

export default DiagramConsumedRemaining;