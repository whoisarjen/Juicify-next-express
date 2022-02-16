import { ActivitySchemaProps } from "../../../../../schema/activity.schema";
import { ProductSchemaProps } from "../../../../../schema/product.schema";
import Circular from "./circular";
import useCircular from "./useCircular";

export interface CircularComponentProps {
    array: Array<Array<ProductSchemaProps & ActivitySchemaProps>>,
    user: any
}

const CircularComponent = ({ array, user }: CircularComponentProps) => {
    const props = useCircular({ array, user })

    return <Circular {...props} />
}

export default CircularComponent;