import AddProductsBox from "./AddProductBox";
import useAddProductBox from "./useAddProductBox";
import { ProductSchemaProps } from "../../../../../schema/product.schema";

export interface AddproductsBoxProps {
    product: ProductSchemaProps,
    refreshCheckedProducts: () => void,
    openMoreInformation: () => void
}

const AddProductsBoxComponent = ({ product, refreshCheckedProducts, openMoreInformation }: AddproductsBoxProps) => {
    const props = useAddProductBox({ product, refreshCheckedProducts, openMoreInformation })

    return <AddProductsBox {...props} />
}

export default AddProductsBoxComponent;