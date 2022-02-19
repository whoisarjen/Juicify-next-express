import MealBox from "./box"
import AddProducts from './box/addProducts'
import DialogEditProduct from './box/editProduct'
import FastDateChanger from '../../common/FastDateChanger'
import Diagrams from './diagrams'
import DiagramsOptions from './diagrams/buttons'
import Header from "../../layout/Header"
import { reverseDateDotes } from "../../../utils/date.utils"
import { useNutritionDiaryProps } from "./useNutritionDiary"
import BottomFlyingGuestBanner from "../../common/bottomFlyingGuestBanner"
import { Share } from "@mui/icons-material"
import styled from "styled-components"
import DateChanger from "../../common/DateChanger"

const Box = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 36px 36px;
    ${this} button {
        margin: auto;
    }
`

const Title = styled.div`
    font-size: 2rem;
    margin-bottom: 10px;
    font-weight: bold;
`

const BaseNutritionDiary = ({ t, router, token, nutritionDiary, user, reload, index, setIndex, product, setProduct, isEditDialog, setIsEditDialog, isAddDialog, setIsAddDialog, deleteProduct, changeProduct, data }: useNutritionDiaryProps) => {
    return (
        <>
            <Header
                title={`${t('title')} ${router.query.login} ${reverseDateDotes(router.query.date)}`}
                description={`${t('title')} ${router.query.login} ${reverseDateDotes(router.query.date)}`}
            />
            <Box>
                <Title>{t('title')}</Title>
                <Share />
                <DateChanger />
            </Box>
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
                token?.login == router?.query.login &&
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
            }
            {token?.login != user?.login && user?.login && <BottomFlyingGuestBanner user={user} />}
        </>
    );
};

export default BaseNutritionDiary;