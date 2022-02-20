import NutritionDiaryBox from "./box"
import FastDateChanger from '../../common/date-changer-fast'
import Diagrams from './diagrams'
import DiagramsSectionButtons from './diagrams/buttons'
import { useNutritionDiaryProps } from "./useNutritionDiary"
import BottomFlyingGuestBanner from "../../common/banner-guest-bottom"
import styled from "styled-components"
import DateChanger from "../../common/date-changer"
import NutritionDiaryBoxProduct from "./box/product"
import { ProductSchemaProps } from "../../../schema/product.schema"
import { ActivitySchemaProps } from "../../../schema/activity.schema"
import Share from "../../common/button-share"
import NavbarOnlyTitle from "../../common/navbar-only-title"

const Box = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 36px 36px;
    ${this} button {
        margin: auto;
    }
`

const BaseNutritionDiary = ({ router, token, nutritionDiary, user, data }: useNutritionDiaryProps) => {
    return (
        <>
            <Box>
                <NavbarOnlyTitle title="nutrition-diary:title" />
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