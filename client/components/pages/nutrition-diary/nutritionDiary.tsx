import MealBox from "./box"
import AddProducts from './addProducts'
import DialogEditProduct from './editProduct'
import Navbar from "./navbar"
import FastDateChanger from '../../../components/common/FastDateChanger'
import Diagrams from './diagramsSection'
import DiagramsOptions from './diagramsSection/buttons'
import BottomFlyingGuestBanner from '../../../components/common/BottomFlyingGuestBanner'
import Header from "../../../components/layout/Header"
import { reverseDateDotes } from "../../../utils/date.utils"
import { useNutritionDiaryProps } from "./useNutritionDiary"

const NutritionDiary = ({ t, router, token, nutritionDiary, user, reload, index, setIndex, product, setProduct, isEditDialog, setIsEditDialog, isAddDialog, setIsAddDialog, deleteProduct, changeProduct, data }: useNutritionDiaryProps) => {
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
                <DiagramsOptions data={data} reloadDailyMeasurement={reload} />
            }
            {
                nutritionDiary.map((x: any, i: number) => (
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
                token?.login == router?.query.login
                    ?
                    <>
                        <AddProducts
                            index={index}
                            isAddDialog={isAddDialog}
                            dailyMeasurement={data}
                            closeDialog={() => setIsAddDialog(false)}
                            reload={reload}
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