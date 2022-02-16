import useEdit from './useEditProduct';
import BaseEditProduct from './editProduct';

export interface EditProductProps {
    product: any,
    isDialog: boolean,
    closeDialog: () => void,
    deleteProduct: (arg0: string) => void
    changeProduct: (arg0: any) => void
}


const EditProduct = ({ product, isDialog, closeDialog, deleteProduct, changeProduct }: EditProductProps) => {
    const props = useEdit({ product, isDialog, closeDialog, deleteProduct, changeProduct })

    return <BaseEditProduct {...props}/>
}

export default EditProduct;