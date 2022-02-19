import { ActivitySchemaProps } from "../../../../../schema/activity.schema";
import { DailyMeasurementSchemaProps } from "../../../../../schema/dailyMeasurement.schema";
import { ProductSchemaProps } from "../../../../../schema/product.schema";
import BaseNutritionDiaryBoxProduct from "./NutritionDiaryBoxProduct";
import useNutritionDiaryBoxProduct from "./useNutritionDiaryBoxProduct";

export interface NutritionDiaryBoxProductProps {
    product: ProductSchemaProps & ActivitySchemaProps
    dailyMeasurement: DailyMeasurementSchemaProps
}

const NutritionDiaryBoxProduct = ({ product, dailyMeasurement }: NutritionDiaryBoxProductProps) => {
    const props = useNutritionDiaryBoxProduct({ product, dailyMeasurement })

    return <BaseNutritionDiaryBoxProduct {...props} />
}

export default NutritionDiaryBoxProduct;