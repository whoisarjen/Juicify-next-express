import useEdit from './useEditProduct';
import BaseEditProduct from './editProduct';

export interface EditProductProps {
    product: any,
    dailyMeasurement: any,
    children: any,
}

const EditProduct = ({ product, dailyMeasurement, children }: EditProductProps) => {
    const props = useEdit({ product, dailyMeasurement, children })

    return <BaseEditProduct {...props} />
}

export default EditProduct;