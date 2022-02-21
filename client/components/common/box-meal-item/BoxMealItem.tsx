import EditIcon from "@mui/icons-material/Edit";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import IconButton from '@mui/material/IconButton';
import styled from "styled-components";
import { getCalories, getMacronutrient } from "../../../utils/product.utils";
import DialogEditNutritionDiaryItem from "../dialog-edit-nutrition-diary-item";
import { useBoxMealItemProps } from "./useBoxMealItem";

const Product = styled.div`
    width: 100%;
    min-height: 50px;
    border-top: 1px solid #e4e4e4;
    margin-top: 10px;
    padding: 15px 0 5px;
    display: grid;
    grid-template-columns: 44px auto;
    grid-column: 1 / 3;
`

const EditButtonContainer = styled.div`
    margin: auto;
    grid-row: 1 / 3;
`

const ProductContent = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    ${this}:nth-child(2) div {
    font-weight: bold;
    margin-top: auto;
`

const BaseBoxMealItem = ({ product, dailyMeasurement, token, router, t }: useBoxMealItemProps) => {
    return (
        <Product>

            <EditButtonContainer>
                {
                    token.login == router.query.login
                        ?
                        <DialogEditNutritionDiaryItem dailyMeasurement={dailyMeasurement} product={product}>
                            <IconButton aria-label="edit">
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </DialogEditNutritionDiaryItem>
                        :
                        <IconButton aria-label="edit">
                            <FastfoodIcon fontSize="small" />
                        </IconButton>
                }
            </EditButtonContainer>

            <ProductContent>
                <div>{product.name || product.activity}</div>
                <div>{getCalories(product)}kcal</div>
            </ProductContent>
            <ProductContent>
                {
                    product.how_many &&
                    <>
                        <div>{getMacronutrient(product, 'p')?.toFixed(1)}{t('P')} {getMacronutrient(product, 'c')?.toFixed(1)}{t('C')} {getMacronutrient(product, 'f')?.toFixed(1)}{t('F')}</div>
                        <div>{parseFloat(product.how_many.toString()) * 100}g/ml</div>
                    </>
                }
            </ProductContent>
            
        </Product>
    )
}

export default BaseBoxMealItem;