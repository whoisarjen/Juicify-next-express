import useTranslation from "next-translate/useTranslation";
import { useState, useEffect } from "react";
import { AddproductsProps } from ".";
import useFind from "../../../../../hooks/useFind";
import { useAppSelector } from "../../../../../hooks/useRedux";
import { ProductSchemaProps } from "../../../../../schema/product.schema";
import { insertThoseIDStoDBController } from "../../../../../utils/db.utils";
import { deleteIndexedDB, getAllIndexedDB } from "../../../../../utils/indexedDB.utils";

const useAddProducts = ({ index, isAddDialog, closeDialog, dailyMeasurement, reload }: AddproductsProps) => {
    const [loadedProduct, setLoadedProduct] = useState<any>(false)
    const { t } = useTranslation('nutrition-diary');
    const [tab, setTab] = useState(0)
    const [open, setOpen] = useState(false)
    const [meal, setMeal] = useState(index)
    const [checked, setChecked] = useState([])
    const token: any = useAppSelector(state => state.token.value)
    const [refreshChecked, setRefreshChecked] = useState(0)
    const [isCreateProduct, setIsCreateProduct] = useState(false)
    const [find, setFind] = useState<any>(null)
    const { items, loading, searchCache } = useFind(find, 'product', tab)

    const created = async (productName: string) => {
        if (productName == find) {
            setFind(null)
        } else {
            setFind(productName)
        }
        setIsCreateProduct(false)
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
        reload()
        closeDialog()
    }

    useEffect(() => setMeal(index), [index])
    useEffect(() => setOpen(false), [searchCache])
    useEffect(() => {
        (async () => {
            setChecked(await getAllIndexedDB('checked_product') || [])
        })()
    }, [refreshChecked])

    return { t, index, isAddDialog, closeDialog, dailyMeasurement, reload, meal, setMeal, open, setOpen, find, setFind, tab, setTab, loading, searchCache, token, items, addProductsToDiary, isCreateProduct, setIsCreateProduct, setRefreshChecked, loadedProduct, setLoadedProduct, checked, created, refreshChecked }
}

export type useAddProductsProps = ReturnType<typeof useAddProducts>

export default useAddProducts;