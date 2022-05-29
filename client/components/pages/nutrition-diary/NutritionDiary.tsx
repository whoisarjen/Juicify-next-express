import BoxMeal from "../../common/box-meal"
import FastDateChanger from '../../common/date-changer-fast'
import Diagrams from '../../common/diagram-consumed-remaining'
import SectionDiaryManaging from '../../common/section-diary-managing'
import { useNutritionDiaryProps } from "./useNutritionDiary"
import BottomFlyingGuestBanner from "../../common/banner-guest-bottom"
import styled from "styled-components"
import DateChanger from "../../common/date-changer"
import BoxMealItem from "../../common/box-meal-item"
import { PRODUCT_SCHEMA_PROPS } from "../../../schema/product.schema"
import { ActivitySchemaProps } from "../../../schema/activity.schema"
import Share from "../../common/button-share"
import NavbarOnlyTitle from "../../common/navbar-only-title"
import useProducts from "../../../hooks/useProducts"

const Box = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 36px 36px;
    ${this} button {
        margin: auto;
    }
`

const BaseNutritionDiary = ({ router, token, nutritionDiary, user, data }: useNutritionDiaryProps) => {
    const {
        products,
        createProduct,
        removeProduct,
        productsReexecuteQuery,
    } = useProducts()

    return (
        <>
            {
                products?.map(({ _id, updatedAt }: any) => (
                    <div onClick={() => removeProduct(_id)} key={_id}>{`${_id} => ${updatedAt}`}</div>
                ))
            }
            <button onClick={() => productsReexecuteQuery()}>Load</button>
            <button onClick={() => createProduct({
                name: "elo",
                p: 2.155,
                c: 11,
            })}>Create</button>
            <Box>
                <NavbarOnlyTitle title="nutrition-diary:title" />
                <Share />
                <DateChanger />
            </Box>

            <FastDateChanger />

            <Diagrams array={nutritionDiary} user={user} />

            {token?.login == router?.query.login && <SectionDiaryManaging data={data} />}

            {
                nutritionDiary.map((products: Array<PRODUCT_SCHEMA_PROPS & ActivitySchemaProps>, i: number) => (
                    <BoxMeal data={data} key={i} index={i} products={products}>
                        {
                            products.map((product: PRODUCT_SCHEMA_PROPS & ActivitySchemaProps) =>
                                <BoxMealItem key={product._id} product={product} dailyMeasurement={data} />
                            )
                        }
                    </BoxMeal>
                ))
            }

            {token?.login != user?.login && user?.login && <BottomFlyingGuestBanner user={user} />}
        </>
    );
};

export default BaseNutritionDiary;