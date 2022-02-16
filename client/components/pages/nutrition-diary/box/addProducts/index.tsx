import { DailyMeasurementSchemaProps } from "../../../../../schema/dailyMeasurement.schema";
import BaseAddProducts from "./AddProducts";
import useAddProducts from "./useAddProducts";

export interface AddproductsProps {
    index: number,
    isAddDialog: boolean,
    closeDialog: () => void,
    dailyMeasurement: DailyMeasurementSchemaProps,
    reload: () => void
}

const AddProducts = ({ index, isAddDialog, closeDialog, dailyMeasurement, reload }: AddproductsProps) => {
    const props = useAddProducts({ index, isAddDialog, closeDialog, dailyMeasurement, reload })
    
    return <BaseAddProducts {...props} />
}

export default AddProducts;