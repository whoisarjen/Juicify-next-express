import { ActivitySchemaProps } from "../../../schema/activity.schema";
import { ProductSchemaProps } from "../../../schema/product.schema";
import BaseDiagramCircularCaloriesProgressPropsReverse from "./DiagramCircularCaloriesProgressPropsReverse";
import useDiagramCircularCaloriesProgressPropsReverse from "./useDiagramCircularCaloriesProgressPropsReverse";

export interface DiagramCircularCaloriesProgressPropsReverseProps {
    array: Array<Array<ProductSchemaProps & ActivitySchemaProps>>,
    user: any
}

const DiagramCircularCaloriesProgressPropsReverse = ({ array, user }: DiagramCircularCaloriesProgressPropsReverseProps) => {
    const props = useDiagramCircularCaloriesProgressPropsReverse({ array, user })

    return <BaseDiagramCircularCaloriesProgressPropsReverse {...props} />
}

export default DiagramCircularCaloriesProgressPropsReverse;