import { ActivitySchemaProps } from "../../../../schema/activity.schema";
import { ProductSchemaProps } from "../../../../schema/product.schema";
import BaseNutritionDiaryBox from "./NutritionDiaryBox";
import useMealBox from "./useNutritionDiaryBox";

export interface NutritionDiaryBoxProps {
    children: any,
    index: number,
    products: Array<ProductSchemaProps & ActivitySchemaProps>,
    data: any,
}

const NutritionDiaryBox = ({ children, index, products, data }: NutritionDiaryBoxProps) => {
    const props = useMealBox({ children, index, products, data });

    return <BaseNutritionDiaryBox {...props} />
};

export default NutritionDiaryBox;