import { ActivitySchemaProps } from "../../../../schema/activity.schema";
import { ProductSchemaProps } from "../../../../schema/product.schema";
import MealBox from "./mealBox";
import useMealBox from "./useMealBox";

export interface MealBoxProps {
    index: number,
    products: Array<ProductSchemaProps & ActivitySchemaProps>,
    openDialog: () => void,
    openEditProduct: (arg0: ProductSchemaProps & ActivitySchemaProps) => void
}

const MealBoxComponent = ({ index, products, openDialog, openEditProduct }: MealBoxProps) => {
    const props = useMealBox({ index, products, openDialog, openEditProduct });

    return <MealBox {...props} />
};

export default MealBoxComponent;