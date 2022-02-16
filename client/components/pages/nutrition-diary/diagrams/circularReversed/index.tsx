import { ActivitySchemaProps } from "../../../../../schema/activity.schema";
import { ProductSchemaProps } from "../../../../../schema/product.schema";
import BaseCircularReversed from "./circularReversed";
import useCircularReversed from "./useCircularReversed";

export interface CircularReversedProps {
    array: Array<Array<ProductSchemaProps & ActivitySchemaProps>>,
    user: any
}

const CircularReversedComponent = ({ array, user }: CircularReversedProps) => {
    const props = useCircularReversed({ array, user })

    return <BaseCircularReversed {...props} />
}

export default CircularReversedComponent;