import useTranslation from "next-translate/useTranslation";
import { useState, useEffect } from "react";
import { EditProductProps } from ".";
import { useAppSelector } from "../../../../../hooks/useRedux";

const useEditProduct = ({ product, isDialog, closeDialog, deleteProduct, changeProduct }: EditProductProps) => {
    const { t } = useTranslation('nutrition-diary');
    const [meal, setMeal] = useState<any>(0)
    const [howMany, setHowMany] = useState<any>(1)
    const [calories, setCalories] = useState<any>(0)
    const [activity, setActivity] = useState<any>('')
    const token: any = useAppSelector(state => state.token.value)
    const [isDialogConfirm, setIsDialogConfirm] = useState(false)
    const requiredBasicInputNumber = useAppSelector(state => state.config.requiredBasicInputNumber)
    const requiredBasicInputLength = useAppSelector(state => state.config.requiredBasicInputLength)
    const requireNumberDiffrentThanZero = useAppSelector(state => state.config.requireNumberDiffrentThanZero)

    const beforeChangeProduct = async () => {
        let newProduct = JSON.parse(JSON.stringify(product))
        let isChanged = false
        if ((calories != product.calories) && requireNumberDiffrentThanZero(calories)) {
            newProduct.calories = calories || 1
            isChanged = true
        }
        if ((meal != product.meal) && requiredBasicInputNumber(meal)) {
            newProduct.meal = meal || 0
            isChanged = true
        }
        if ((howMany != product.how_many) && requiredBasicInputNumber(howMany)) {
            newProduct.how_many = howMany || 1
            isChanged = true
        }
        if ((activity != product.activity) && requiredBasicInputLength(activity)) {
            newProduct.activity = activity || 1
            isChanged = true
        }
        if (isChanged) {
            changeProduct(newProduct)
        }
        closeDialog()
    }

    useEffect(() => {
        setMeal(product.meal)
        setHowMany(product.how_many)
        setCalories(product.calories)
        setActivity(product.activity)
    }, [product])

    return { product, isDialog, closeDialog, deleteProduct, meal, setMeal, token, t, activity, setActivity, requiredBasicInputLength, calories, setCalories, isDialogConfirm, setIsDialogConfirm, beforeChangeProduct, requiredBasicInputNumber, howMany, setHowMany, requireNumberDiffrentThanZero }
}

export type useEditProductProps = ReturnType<typeof useEditProduct>

export default useEditProduct;