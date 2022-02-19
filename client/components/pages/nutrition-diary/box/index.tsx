import { ActivitySchemaProps } from "../../../../schema/activity.schema";
import { ProductSchemaProps } from "../../../../schema/product.schema";
import BaseNutritionDiaryBox from "./NutritionDiaryBox";
import useMealBox from "./useNutritionDiaryBox";

export interface NutritionDiaryBoxProps {
    index: number,
    products: Array<ProductSchemaProps & ActivitySchemaProps>,
    openDialog: () => void,
    data: any,
}

const NutritionDiaryBox = ({ index, products, openDialog, data }: NutritionDiaryBoxProps) => {
    const props = useMealBox({ index, products, openDialog, data });

    return <BaseNutritionDiaryBox {...props} />
};

export default NutritionDiaryBox;