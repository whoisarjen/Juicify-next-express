import { zodResolver } from "@hookform/resolvers/zod";
import useTranslation from "next-translate/useTranslation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DialogEditNutritionDiaryItemProps } from ".";
import { useAppSelector } from "../../../hooks/useRedux";
import { ActivitySchemaProps, ActivitySchema } from "../../../schema/activity.schema";
import { insertThoseIDStoDBController, overwriteThoseIDSinDB } from "../../../utils/db.utils";

const useDialogEditNutritionDiaryItem = ({ product, dailyMeasurement, children }: DialogEditNutritionDiaryItemProps) => {
    const [isDialog, setIsDialog] = useState(false)
    const { t } = useTranslation('nutrition-diary');
    const token: any = useAppSelector(state => state.token.value)

    const changeNutritionDiary = async (values: ActivitySchemaProps) => {
        let object = { ...product, ...values }
        dailyMeasurement.nutrition_diary = dailyMeasurement.nutrition_diary.map((x: any) => {
            if (x._id == object._id) {
                return object;
            }

            return x;
        })
        await insertThoseIDStoDBController('daily_measurement', [dailyMeasurement])
        setIsDialog(false)
    }

    const deleteProduct = async (_id: string) => {
        let copy = JSON.parse(JSON.stringify(dailyMeasurement))
        copy.nutrition_diary = copy.nutrition_diary.map((obj: any) =>
            obj._id == _id ? { ...obj, deleted: true } : obj
        );
        await overwriteThoseIDSinDB('daily_measurement', [copy])
    }

    const { register, formState: { errors }, handleSubmit, reset } = useForm<ActivitySchemaProps>({
        resolver: zodResolver(ActivitySchema)
    })

    useEffect(() => reset(product), [product])

    return { product, children, isDialog, setIsDialog, token, register, errors, handleSubmit, changeNutritionDiary, deleteProduct, t }
}

export type useDialogEditNutritionDiaryItemProps = ReturnType<typeof useDialogEditNutritionDiaryItem>

export default useDialogEditNutritionDiaryItem;