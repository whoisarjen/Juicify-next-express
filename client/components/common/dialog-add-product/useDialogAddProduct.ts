import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import { DialogAddProductProps } from "."
import { useNotify } from "../../../hooks/useNotify"
import { useAppSelector } from "../../../hooks/useRedux"
import { insertThoseIDStoDBController } from "../../../utils/db.utils"

const useDialogAddProduct = ({ children, dailyMeasurement, defaultMeal = 0, loadedProduct }: DialogAddProductProps) => {
    const { t } = useTranslation('nutrition-diary')
    const [meal, setMeal] = useState(defaultMeal)
    const [howMany, setHowMany] = useState('1')
    const token: any = useAppSelector(state => state.token.value)
    const [isDialog, setIsDialog] = useState(false)
    const { success } = useNotify()

    const addNewProduct = async () => {
        if (parseFloat(howMany) > 0) {
            let object: any = { ...dailyMeasurement }
            object.nutrition_diary.push({
                ...loadedProduct,
                "_id": 'XD' + new Date().getTime(),
                "meal": meal,
                "how_many": howMany,
                "product_ID": loadedProduct._id
            })
            await insertThoseIDStoDBController('daily_measurement', [object])
        }
        setIsDialog(false)
        success()
    }

    return { children, meal, setMeal, token, howMany, setHowMany, addNewProduct, t, isDialog, setIsDialog }
}

export type useDialogAddProductProps = ReturnType<typeof useDialogAddProduct>

export default useDialogAddProduct;