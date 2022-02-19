import { DailyMeasurementSchemaProps } from "../../../../../schema/dailyMeasurement.schema";
import BaseAddProducts from "./AddProducts";
import useAddProducts from "./useAddProducts";

export interface AddproductsProps {
    index: number,
    isAddDialog: boolean,
    closeDialog: () => void,
    dailyMeasurement: DailyMeasurementSchemaProps,
}

const AddProducts = ({ index, isAddDialog, closeDialog, dailyMeasurement }: AddproductsProps) => {
    const props = useAddProducts({ index, isAddDialog, closeDialog, dailyMeasurement })
    
    return <BaseAddProducts {...props} />
}

export default AddProducts;