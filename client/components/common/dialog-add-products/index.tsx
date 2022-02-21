import { DailyMeasurementSchemaProps } from "../../../schema/dailyMeasurement.schema";
import BaseDialogAddProducts from "./DialogAddProducts";
import useDialogAddProducts from "./useDialogAddProducts";

export interface DialogAddProductsProps {
    children: any,
    index: number,
    dailyMeasurement: DailyMeasurementSchemaProps,
}

const DialogAddProducts = ({ children, index, dailyMeasurement }: DialogAddProductsProps) => {
    const props = useDialogAddProducts({ children, index, dailyMeasurement })
    
    return <BaseDialogAddProducts {...props} />
}

export default DialogAddProducts;