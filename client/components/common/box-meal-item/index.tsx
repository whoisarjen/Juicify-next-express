import { ActivitySchemaProps } from "../../../schema/activity.schema";
import { DailyMeasurementSchemaProps } from "../../../schema/dailyMeasurement.schema";
import { ProductSchemaProps } from "../../../schema/product.schema";
import BaseBoxMealItem from "./BoxMealItem";
import useBoxMealItem from "./useBoxMealItem";

export interface BoxMealItemProps {
    product: ProductSchemaProps & ActivitySchemaProps
    dailyMeasurement: DailyMeasurementSchemaProps
}

const BoxMealItem = ({ product, dailyMeasurement }: BoxMealItemProps) => {
    const props = useBoxMealItem({ product, dailyMeasurement })

    return <BaseBoxMealItem {...props} />
}

export default BoxMealItem;