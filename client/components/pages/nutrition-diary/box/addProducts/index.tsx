import { DailyMeasurementSchemaProps } from "../../../../../schema/dailyMeasurement.schema";
import BaseAddProducts from "./AddProducts";
import useAddProducts from "./useAddProducts";

export interface AddproductsProps {
    children: any,
    index: number,
    dailyMeasurement: DailyMeasurementSchemaProps,
}

const AddProducts = ({ children, index, dailyMeasurement }: AddproductsProps) => {
    const props = useAddProducts({ children, index, dailyMeasurement })
    
    return <BaseAddProducts {...props} />
}

export default AddProducts;