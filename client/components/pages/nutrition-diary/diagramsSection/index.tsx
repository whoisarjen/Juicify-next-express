import { ProductSchemaProps } from "../../../../schema/product.schema";
import Diagram from "./Diagram";
import useDiagram from "./useDiagram";

export interface DiagramsProps {
    array: Array<Array<ProductSchemaProps>>,
    user: any
}

const DiagramsComponent = ({ array, user }: DiagramsProps) => {
    const props = useDiagram({ array, user })

    return <Diagram {...props} /> 
}

export default DiagramsComponent;