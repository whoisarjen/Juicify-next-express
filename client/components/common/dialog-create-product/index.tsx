import BaseDialogCreateProduct from "./DialogCreateProduct";
import useDialogCreateProduct from "./useDialogCreateProduct";

export interface DialogCreateProductProps {
    children: any
    created: (arg0: string) => void
    defaultBarcode?: string | number
}

const DialogCreateProduct = ({ children, created, defaultBarcode }: DialogCreateProductProps) => {
    const props = useDialogCreateProduct({ children, created, defaultBarcode })

    return <BaseDialogCreateProduct {...props} />
}

export default DialogCreateProduct;