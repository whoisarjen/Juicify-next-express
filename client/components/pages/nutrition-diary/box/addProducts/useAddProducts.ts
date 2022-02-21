import useTranslation from "next-translate/useTranslation";
import { useState, useEffect } from "react";
import { AddproductsProps } from ".";
import useFind from "../../../../../hooks/useFind";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/useRedux";
import { refreshKey } from "../../../../../redux/features/key.slice";
import { ProductSchemaProps } from "../../../../../schema/product.schema";
import { insertThoseIDStoDBController } from "../../../../../utils/db.utils";
import { deleteIndexedDB, getAllIndexedDB } from "../../../../../utils/indexedDB.utils";

const useAddProducts = ({ children, index, dailyMeasurement }: AddproductsProps) => {
    const [isDialog, setIsDialog] = useState(false)
    const [loadedProduct, setLoadedProduct] = useState<any>(false)
    const { t } = useTranslation('nutrition-diary');
    const [tab, setTab] = useState(0)
    const [open, setOpen] = useState(false)
    const [meal, setMeal] = useState(index)
    const [checked, setChecked] = useState([])
    const token: any = useAppSelector(state => state.token.value)
    const [refreshChecked, setRefreshChecked] = useState(0)
    const [find, setFind] = useState<any>(null)
    const { items, loading, searchCache } = useFind(find, 'product', tab)
    const dispatch = useAppDispatch()

    const created = async (productName: string) => {
        if (productName == find) {
            setFind(null)
        } else {
            setFind(productName)
        }
    }

    const addProductsToDiary = async () => {
        const array: Array<ProductSchemaProps> = JSON.parse(JSON.stringify(checked))
        const time = new Date().getTime()
        array.map(async (x: ProductSchemaProps, i: number) => {
            x.meal = meal
            x.product_ID = x._id
            x._id = 'XD' + time + i
            await deleteIndexedDB('checked_product', x.product_ID)
            return x
        })
        setChecked([])
        if (!dailyMeasurement.nutrition_diary) dailyMeasurement.nutrition_diary = []
        dailyMeasurement.nutrition_diary = dailyMeasurement.nutrition_diary.concat(array)
        await insertThoseIDStoDBController('daily_measurement', [dailyMeasurement])
        dispatch(refreshKey('daily_measurement'))
        setIsDialog(false)
    }

    useEffect(() => setMeal(index), [index])
    useEffect(() => setOpen(false), [searchCache])
    useEffect(() => {
        (async () => {
            setChecked(await getAllIndexedDB('checked_product') || [])
        })()
    }, [refreshChecked])

    return { children, isDialog, setIsDialog, t, index, dailyMeasurement, meal, setMeal, open, setOpen, find, setFind, setTab, loading, searchCache, token, items, addProductsToDiary, setRefreshChecked, loadedProduct, setLoadedProduct, checked, created, refreshChecked }
}

export type useAddProductsProps = ReturnType<typeof useAddProducts>

export default useAddProducts;