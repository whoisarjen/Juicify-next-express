import { ActivitySchemaProps } from "../../../schema/activity.schema";
import { PRODUCT_SCHEMA_PROPS } from "../../../schema/product.schema";
import BaseCircular from "./DiagramCircularCaloriesProgress";
import useCircular from "./useDiagramCircularCaloriesProgress";

export interface DiagramCircularCaloriesProgressProps {
    array: Array<Array<PRODUCT_SCHEMA_PROPS & ActivitySchemaProps>>,
    user: any
}

const DiagramCircularCaloriesProgress = ({ array, user }: DiagramCircularCaloriesProgressProps) => {
    const props = useCircular({ array, user })

    return <BaseCircular {...props} />
}

export default DiagramCircularCaloriesProgress;