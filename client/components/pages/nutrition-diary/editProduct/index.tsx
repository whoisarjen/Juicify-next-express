import useEdit from './useEdit';
import EditMeal from './edit';

export interface DialogEditProductProps {
    product: any,
    isDialog: boolean,
    closeDialog: () => void,
    deleteProduct: (arg0: string) => void
    changeProduct: (arg0: any) => void
}


const EditMealComponent = ({ product, isDialog, closeDialog, deleteProduct, changeProduct }: DialogEditProductProps) => {
    const props = useEdit({ product, isDialog, closeDialog, deleteProduct, changeProduct })

    return <EditMeal {...props}/>
}

export default EditMealComponent;