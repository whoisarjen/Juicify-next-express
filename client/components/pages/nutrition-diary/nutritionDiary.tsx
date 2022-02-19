import NutritionDiaryBox from "./box"
import FastDateChanger from '../../common/FastDateChanger'
import Diagrams from './diagrams'
import DiagramsSectionButtons from './diagrams/buttons'
import Header from "../../layout/Header"
import { reverseDateDotes } from "../../../utils/date.utils"
import { useNutritionDiaryProps } from "./useNutritionDiary"
import BottomFlyingGuestBanner from "../../common/bottomFlyingGuestBanner"
import { Share } from "@mui/icons-material"
import styled from "styled-components"
import DateChanger from "../../common/DateChanger"
import NutritionDiaryBoxProduct from "./box/product"
import { ProductSchemaProps } from "../../../schema/product.schema"
import { ActivitySchemaProps } from "../../../schema/activity.schema"

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

const BaseNutritionDiary = ({ t, router, token, nutritionDiary, user, data }: useNutritionDiaryProps) => {
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

            {token?.login == router?.query.login && <DiagramsSectionButtons data={data} />}

            {
                nutritionDiary.map((products: Array<ProductSchemaProps & ActivitySchemaProps>, i: number) => (
                    <NutritionDiaryBox data={data} key={i} index={i} products={products}>
                        {
                            products.map((product: ProductSchemaProps & ActivitySchemaProps) =>
                                <NutritionDiaryBoxProduct key={product._id} product={product} dailyMeasurement={data} />
                            )
                        }
                    </NutritionDiaryBox>
                ))
            }

            {token?.login != user?.login && user?.login && <BottomFlyingGuestBanner user={user} />}
        </>
    );
};

export default BaseNutritionDiary;