import { ActivitySchemaProps } from "../../../schema/activity.schema";
import { PRODUCT_SCHEMA_PROPS } from "../../../schema/product.schema";
import BaseDiagramCircularCaloriesProgressPropsReverse from "./DiagramCircularCaloriesProgressPropsReverse";
import useDiagramCircularCaloriesProgressPropsReverse from "./useDiagramCircularCaloriesProgressPropsReverse";

export interface DiagramCircularCaloriesProgressPropsReverseProps {
    array: Array<Array<PRODUCT_SCHEMA_PROPS & ActivitySchemaProps>>,
    user: any
}

const DiagramCircularCaloriesProgressPropsReverse = ({ array, user }: DiagramCircularCaloriesProgressPropsReverseProps) => {
    const props = useDiagramCircularCaloriesProgressPropsReverse({ array, user })

    return <BaseDiagramCircularCaloriesProgressPropsReverse {...props} />
}

export default DiagramCircularCaloriesProgressPropsReverse;