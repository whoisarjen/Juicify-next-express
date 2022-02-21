import { ActivitySchemaProps } from "../../../schema/activity.schema";
import { ProductSchemaProps } from "../../../schema/product.schema";
import BaseCircular from "./DiagramCircularCaloriesProgress";
import useCircular from "./useDiagramCircularCaloriesProgress";

export interface DiagramCircularCaloriesProgressProps {
    array: Array<Array<ProductSchemaProps & ActivitySchemaProps>>,
    user: any
}

const DiagramCircularCaloriesProgress = ({ array, user }: DiagramCircularCaloriesProgressProps) => {
    const props = useCircular({ array, user })

    return <BaseCircular {...props} />
}

export default DiagramCircularCaloriesProgress;