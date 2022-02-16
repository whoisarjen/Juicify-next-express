import { ActivitySchemaProps } from "../../../../schema/activity.schema";
import { ProductSchemaProps } from "../../../../schema/product.schema";
import BaseNutritionDiaryBox from "./NutritionDiaryBox";
import useMealBox from "./useNutritionDiaryBox";

export interface NutritionDiaryBoxProps {
    index: number,
    products: Array<ProductSchemaProps & ActivitySchemaProps>,
    openDialog: () => void,
    openEditProduct: (arg0: ProductSchemaProps & ActivitySchemaProps) => void
}

const NutritionDiaryBox = ({ index, products, openDialog, openEditProduct }: NutritionDiaryBoxProps) => {
    const props = useMealBox({ index, products, openDialog, openEditProduct });

    return <BaseNutritionDiaryBox {...props} />
};

export default NutritionDiaryBox;