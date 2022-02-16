import AddProducts, { AddproductsProps } from "./addProducts";
import useAddProducts from "./useAddProducts";


const AddProductsComponent = ({ index, isAddDialog, closeDialog, dailyMeasurement, reload }: AddproductsProps) => {
    const props = useAddProducts({ index, isAddDialog, closeDialog, dailyMeasurement, reload })
    
    return <AddProducts {...props} />
}

export default AddProductsComponent;