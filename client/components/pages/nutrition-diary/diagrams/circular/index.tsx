import { ActivitySchemaProps } from "../../../../../schema/activity.schema";
import { ProductSchemaProps } from "../../../../../schema/product.schema";
import BaseCircular from "./circular";
import useCircular from "./useCircular";

export interface CircularComponentProps {
    array: Array<Array<ProductSchemaProps & ActivitySchemaProps>>,
    user: any
}

const CircularComponent = ({ array, user }: CircularComponentProps) => {
    const props = useCircular({ array, user })

    return <BaseCircular {...props} />
}

export default CircularComponent;