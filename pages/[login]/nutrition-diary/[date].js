import Link from "next/link"
import { useRouter } from "next/router"
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { addDaysToDate } from '../../../utils/manageDate'
import { overwriteThoseIDSinDB } from "../../../utils/API"
import { useDailyMeasurement } from '../../../hooks/useDaily'
import MealBox from "../../../components/nutrition-diary/MealBox"
import AddProducts from '../../../components/nutrition-diary/AddProducts'
import DialogEditProduct from '../../../components/nutrition-diary/DialogEditProduct';
import { useSynchronization } from "../../../hooks/useSynchronization"

const NutritionDiary = () => {
    const router = useRouter()
    const [index, setIndex] = useState(0)
    const [product, setProduct] = useState({})
    const token = useSelector(state => state.token.value)
    const [isAddDialog, setIsAddDialog] = useState(false)
    const [isEditDialog, setIsEditDialog] = useState(false)
    const sendSynchronizationMessege = useSynchronization()
    const [nutrition_diary, setNutrition_diary] = useState([])
    const isOnline = useSelector(state => state.online.isOnline)
    const [{ dataObject, user }, reloadDailyMeasurement] = useDailyMeasurement(router.query.date)

    const deleteProduct = async (_id) => {
        let copyDailyMeasurement = JSON.parse(JSON.stringify(dataObject))
        copyDailyMeasurement.nutrition_diary = copyDailyMeasurement.nutrition_diary.map(obj =>
            obj._id == _id ? { ...obj, deleted: true } : obj
        );
        await overwriteThoseIDSinDB('daily_measurement', [copyDailyMeasurement], isOnline)
            .then(res => sendSynchronizationMessege('daily_measurement', 'change', res))
        reloadDailyMeasurement()
    }

    const changeProduct = async (newProduct) => {
        let copyDailyMeasurement = JSON.parse(JSON.stringify(dataObject))
        copyDailyMeasurement.nutrition_diary = copyDailyMeasurement.nutrition_diary.map(obj =>
            obj._id == newProduct._id ? { ...obj, ...{ changed: true, how_many: newProduct.how_many, meal: newProduct.meal } } : obj
        );
        await overwriteThoseIDSinDB('daily_measurement', [copyDailyMeasurement], isOnline)
            .then(res => sendSynchronizationMessege('daily_measurement', 'change', res))
        reloadDailyMeasurement()
    }

    useEffect(() => {
        if (dataObject && dataObject.nutrition_diary) {
            const arr = []
            const l = user.meal_number || 5
            for (let i = 0; i < l; i++) {
                arr.push([])
            }
            const length = arr.length
            dataObject.nutrition_diary.forEach(meal => {
                if (meal.meal + 1 > length) {
                    for (let i = 0; i < meal.meal + 1 - length; i++) {
                        arr.push([])
                    }
                }
                arr[meal.meal].push(meal)
            })
            setNutrition_diary(arr)
        }
    }, [dataObject])

    return (
        <div className="NutritionDiary">
            <Link passHref href={`/${router.query.login}/nutrition-diary/${addDaysToDate(router.query.date, 1)}`}><a>Next</a></Link>
            {
                nutrition_diary && nutrition_diary.map((x, i) => (
                    <MealBox
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
                token && token.login == router.query.login &&
                <AddProducts
                    index={index}
                    isAddDialog={isAddDialog}
                    dailyMeasurement={dataObject}
                    closeDialog={() => setIsAddDialog(false)}
                    reloadDailyMeasurement={reloadDailyMeasurement}
                />
            }
            {
                token && token.login == router.query.login &&
                <DialogEditProduct
                    product={product}
                    isDialog={isEditDialog}
                    closeDialog={() => setIsEditDialog(false)}
                    deleteProduct={(_id) => deleteProduct(_id)}
                    changeProduct={(newProduct) => changeProduct(newProduct)}
                />
            }
        </div>
    );
};

export default NutritionDiary;
