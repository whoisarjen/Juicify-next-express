import { ActivitySchemaProps } from "../../../schema/activity.schema";
import { PRODUCT_SCHEMA_PROPS } from "../../../schema/product.schema";
import BaseBoxMeal from "./BoxMeal";
import useMealBox from "./useBoxMeal";

export interface BoxMealProps {
    children: any,
    index: number,
    products: Array<PRODUCT_SCHEMA_PROPS & ActivitySchemaProps>,
    data: any,
}

const BoxMeal = ({ children, index, products, data }: BoxMealProps) => {
    const props = useMealBox({ children, index, products, data });

    return <BaseBoxMeal {...props} />
};

export default BoxMeal;