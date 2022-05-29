import { ActivitySchemaProps } from "../../../schema/activity.schema";
import { DailyMeasurementSchemaProps } from "../../../schema/dailyMeasurement.schema";
import { PRODUCT_SCHEMA_PROPS } from "../../../schema/product.schema";
import BaseBoxMealItem from "./BoxMealItem";
import useBoxMealItem from "./useBoxMealItem";

export interface BoxMealItemProps {
    product: PRODUCT_SCHEMA_PROPS & ActivitySchemaProps
    dailyMeasurement: DailyMeasurementSchemaProps
}

const BoxMealItem = ({ product, dailyMeasurement }: BoxMealItemProps) => {
    const props = useBoxMealItem({ product, dailyMeasurement })

    return <BaseBoxMealItem {...props} />
}

export default BoxMealItem;