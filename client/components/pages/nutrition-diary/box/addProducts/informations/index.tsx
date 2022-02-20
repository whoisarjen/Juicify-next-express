import BaseAddProductsInformations from "./AddProductsinformations";
import useInformations from "./useAddProductsinformations";

export interface AddProductsInformationsProps {
    loadedProduct: any,
    handleClose: () => void,
    dailyMeasurement: any
}

const AddProductsInformations = ({ loadedProduct, handleClose, dailyMeasurement }: AddProductsInformationsProps) => {
    const props = useInformations({ loadedProduct, handleClose, dailyMeasurement })

    return <BaseAddProductsInformations {...props} />
}

export default AddProductsInformations;