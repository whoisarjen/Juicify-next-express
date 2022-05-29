import BaseBoxProduct from "./BoxProduct";
import useAddProductBox from "./useBoxProduct";
import { PRODUCT_SCHEMA_PROPS } from "../../../schema/product.schema";

export interface BoxProductProps {
    product: PRODUCT_SCHEMA_PROPS,
    refreshCheckedProducts: () => void,
    openMoreInformation: () => void
}

const BoxProduct = ({ product, refreshCheckedProducts, openMoreInformation }: BoxProductProps) => {
    const props = useAddProductBox({ product, refreshCheckedProducts, openMoreInformation })

    return <BaseBoxProduct {...props} />
}

export default BoxProduct;