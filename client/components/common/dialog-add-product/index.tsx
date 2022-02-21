import BaseDialogAddProduct from "./DialogAddProduct";
import useDialogAddProduct from "./useDialogAddProduct";

export interface DialogAddProductProps {
    isAdd: boolean,
    setIsAdd: (arg0: boolean) => void,
    dailyMeasurement: any,
    defaultMeal?: number,
    loadedProduct: any
}

const DialogAddProduct = ({ isAdd, setIsAdd, dailyMeasurement, defaultMeal = 0, loadedProduct }: DialogAddProductProps) => {
    const props = useDialogAddProduct({ isAdd, setIsAdd, dailyMeasurement, defaultMeal, loadedProduct })

    return <BaseDialogAddProduct {...props} />
}

export default DialogAddProduct;