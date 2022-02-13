import { useRouter } from "next/router"
import { useAppSelector } from '../../../hooks/useRedux'
import { useState, useEffect } from 'react'
import { overwriteThoseIDSinDB } from "../../../utils/db.utils"
import { useDailyMeasurement } from '../../../hooks/useDailyMeasurement'
import Box from "../../../components/nutrition-diary/Box"
import AddProducts from '../../../components/nutrition-diary/AddProduct'
import DialogEditProduct from '../../../components/nutrition-diary/BoxEdit'
import Navbar from "../../../components/nutrition-diary/Navbar"
import FastDateChanger from '../../../components/common/FastDateChanger'
import Diagrams from '../../../components/nutrition-diary/Diagram'
import DiagramsOptions from '../../../components/nutrition-diary/DiagramButtons'
import BottomFlyingGuestBanner from '../../../components/common/BottomFlyingGuestBanner'
import Header from "../../../components/layout/Header"
import useTranslation from "next-translate/useTranslation"
import { reverseDateDotes } from "../../../utils/date.utils"

const NutritionDiary = () => {
    const { t } = useTranslation('nutrition-diary')
    const router: any = useRouter()
    const [index, setIndex] = useState(0)
    const [product, setProduct] = useState({ _id: '' }) // Placeholder is necessary
    const token: any = useAppSelector(state => state.token.value)
    const [isAddDialog, setIsAddDialog] = useState(false)
    const [isEditDialog, setIsEditDialog] = useState(false)
    const [nutritionDiary, setNutritionDiary] = useState(Array(5).fill([]))
    const [{ data, user }, reloadDailyMeasurement] = useDailyMeasurement(router.query.date, router.query.login)

    const deleteProduct = async (_id: string) => {
        let copy = JSON.parse(JSON.stringify(data))
        copy.nutrition_diary = copy.nutrition_diary.map((obj: any) =>
            obj._id == _id ? { ...obj, deleted: true } : obj
        );
        await overwriteThoseIDSinDB('daily_measurement', [copy])
        reloadDailyMeasurement()
    }

    const changeProduct = async (newProduct: any) => {
        let copy = JSON.parse(JSON.stringify(data))
        copy.nutrition_diary = copy.nutrition_diary.map((obj: any) =>
            obj._id == newProduct._id ? { ...obj, ...{ changed: true }, ...newProduct } : obj
        );
        await overwriteThoseIDSinDB('daily_measurement', [copy])
        reloadDailyMeasurement()
    }

    useEffect(() => {
        if (data?.nutrition_diary) {
            const arr: any = []
            const l = user.meal_number || 5
            for (let i = 0; i < l; i++) {
                arr.push([])
            }
            const length = arr.length
            data.nutrition_diary.forEach((meal: any) => {
                if (!meal.deleted) {
                    if (!meal.meal) {
                        meal.meal = 0
                    }
                    if (meal.meal + 1 > length) {
                        for (let i = 0; i < meal.meal + 1 - length; i++) {
                            arr.push([])
                        }
                    }
                    arr[meal.meal].push(meal)
                }
            })
            setNutritionDiary(arr)
        }
    }, [data])

    return (
        <>
            <Header
                title={`${t('title')} ${router.query.login} ${reverseDateDotes(router.query.date)}`}
                description={`${t('title')} ${router.query.login} ${reverseDateDotes(router.query.date)}`}
            />
            <Navbar />
            <FastDateChanger />
            <Diagrams array={nutritionDiary} user={user} />
            {
                token?.login == router?.query.login &&
                <DiagramsOptions data={data} reloadDailyMeasurement={reloadDailyMeasurement} />
            }
            {
                nutritionDiary.map((x, i) => (
                    <Box
                        key={i}
                        index={i}
                        products={x}
                        openDialog={() => {
                            setIndex(i)
                            setIsAddDialog(true)
                        }}
                        openEditProduct={(product) => {
                            setProduct(product)
                            setIsEditDialog(true)
                        }}
                    />
                ))
            }
            {
                token?.login == router?.query.login
                    ?
                    <>
                        <AddProducts
                            index={index}
                            isAddDialog={isAddDialog}
                            dailyMeasurement={data}
                            closeDialog={() => setIsAddDialog(false)}
                            reload={reloadDailyMeasurement}
                        />
                        <DialogEditProduct
                            product={product}
                            isDialog={isEditDialog}
                            closeDialog={() => setIsEditDialog(false)}
                            deleteProduct={(_id) => deleteProduct(_id)}
                            changeProduct={(newProduct) => changeProduct(newProduct)}
                        />
                    </>
                    :
                    <BottomFlyingGuestBanner user={user} />
            }
        </>
    );
};

export default NutritionDiary;
