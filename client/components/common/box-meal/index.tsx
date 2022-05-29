import { ActivitySchemaProps } from "../../../schema/activity.schema";
import { ProductSchemaProps } from "../../../schema/product.schema";
import BaseBoxMeal from "./BoxMeal";
import useMealBox from "./useBoxMeal";

export interface BoxMealProps {
    children: any,
    index: number,
    products: Array<ProductSchemaProps & ActivitySchemaProps>,
    data: any,
}

const BoxMeal = ({ children, index, products, data }: BoxMealProps) => {
    const props = useMealBox({ children, index, products, data });

    return <BaseBoxMeal {...props} />
};

export default BoxMeal;