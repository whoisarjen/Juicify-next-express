import useCreateProduct from "./useCreateProduct";
import CreateProduct from './createProduct'

export interface CreateProductProps {
    closeCreateProduct: () => void,
    isCreateProduct: boolean,
    created: (arg0: string) => void
    defaultBarcode?: string | number
}

const CreateProductComponent = ({ closeCreateProduct, isCreateProduct, created, defaultBarcode }: CreateProductProps) => {
    const props = useCreateProduct({ closeCreateProduct, isCreateProduct, created, defaultBarcode })

    return <CreateProduct {...props} />
}

export default CreateProductComponent;