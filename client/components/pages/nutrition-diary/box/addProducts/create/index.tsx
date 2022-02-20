import BaseAddProductsCreate from "./AddProductsCreate";
import useAddProductsCreate from "./useAddProductsCreate";

export interface AddProductsCreateProps {
    closeCreateProduct: () => void,
    isCreateProduct: boolean,
    created: (arg0: string) => void
    defaultBarcode?: string | number
}

const AddProductsCreate = ({ closeCreateProduct, isCreateProduct, created, defaultBarcode }: AddProductsCreateProps) => {
    const props = useAddProductsCreate({ closeCreateProduct, isCreateProduct, created, defaultBarcode })

    return <BaseAddProductsCreate {...props} />
}

export default AddProductsCreate;