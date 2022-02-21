import useDialogEditNutritionDiaryItem from './useDialogEditNutritionDiaryItem';
import BaseDialogEditNutritionDiaryItem from './DialogEditNutritionDiaryItem';

export interface DialogEditNutritionDiaryItemProps {
    product: any,
    dailyMeasurement: any,
    children: any,
}

const DialogEditNutritionDiaryItem = ({ product, dailyMeasurement, children }: DialogEditNutritionDiaryItemProps) => {
    const props = useDialogEditNutritionDiaryItem({ product, dailyMeasurement, children })

    return <BaseDialogEditNutritionDiaryItem {...props} />
}

export default DialogEditNutritionDiaryItem;