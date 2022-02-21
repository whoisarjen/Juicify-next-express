import BaseBoxProduct from "./BoxProduct";
import useAddProductBox from "./useBoxProduct";
import { ProductSchemaProps } from "../../../schema/product.schema";

export interface BoxProductProps {
    product: ProductSchemaProps,
    refreshCheckedProducts: () => void,
    openMoreInformation: () => void
}

const BoxProduct = ({ product, refreshCheckedProducts, openMoreInformation }: BoxProductProps) => {
    const props = useAddProductBox({ product, refreshCheckedProducts, openMoreInformation })

    return <BaseBoxProduct {...props} />
}

export default BoxProduct;