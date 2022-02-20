import BaseAddProductsInformationsAdd from "./AddProductsInformationsAdd";
import useInformationsAdd from "./useAddProductsInformationsAdd";

export interface AddProductsInformationsAddProps {
    isAdd: boolean,
    setIsAdd: (arg0: boolean) => void,
    dailyMeasurement: any,
    defaultMeal?: number,
    loadedProduct: any
}

const AddProductsInformationsAdd = ({ isAdd, setIsAdd, dailyMeasurement, defaultMeal = 0, loadedProduct }: AddProductsInformationsAddProps) => {
    const props = useInformationsAdd({ isAdd, setIsAdd, dailyMeasurement, defaultMeal, loadedProduct })

    return <BaseAddProductsInformationsAdd {...props} />
}

export default AddProductsInformationsAdd;