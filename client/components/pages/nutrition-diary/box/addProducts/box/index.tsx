import BaseAddProductsBox from "./AddProductBox";
import useAddProductBox from "./useAddProductBox";
import { ProductSchemaProps } from "../../../../../../schema/product.schema";

export interface AddproductsBoxProps {
    product: ProductSchemaProps,
    refreshCheckedProducts: () => void,
    openMoreInformation: () => void
}

const AddProductsBox = ({ product, refreshCheckedProducts, openMoreInformation }: AddproductsBoxProps) => {
    const props = useAddProductBox({ product, refreshCheckedProducts, openMoreInformation })

    return <BaseAddProductsBox {...props} />
}

export default AddProductsBox;