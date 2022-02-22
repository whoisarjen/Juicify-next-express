import BaseDialogAddProduct from "./DialogAddProduct";
import useDialogAddProduct from "./useDialogAddProduct";

export interface DialogAddProductProps {
    children: any,
    dailyMeasurement: any,
    defaultMeal?: number,
    loadedProduct: any
}

const DialogAddProduct = ({ children, dailyMeasurement, defaultMeal = 0, loadedProduct }: DialogAddProductProps) => {
    const props = useDialogAddProduct({ children, dailyMeasurement, defaultMeal, loadedProduct })

    return <BaseDialogAddProduct {...props} />
}

export default DialogAddProduct;