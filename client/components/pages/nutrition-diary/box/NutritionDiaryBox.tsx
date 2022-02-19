import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { getCalories } from '../../../../utils/product.utils';
import { ProductSchemaProps } from '../../../../schema/product.schema';
import { ActivitySchemaProps } from '../../../../schema/activity.schema';
import styled from "styled-components";
import { useNutritionDiaryBoxProps } from "./useNutritionDiaryBox";

const Grid = styled.div`
    width: calc(100% - 24px);
    border: 1px solid #e4e4e4;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 12px;
    min-height: 50px;
    display: grid;
    grid-template-columns: auto 44px 44px;
    font-size: 0.875rem;
`

const Bolded = styled.div`
    font-weight: bold;
`

const ExtraOptions = styled.div`
    grid-column: 2;
    grid-row: 1/3;
    width: 100%;
    height: 100%;
    display: grid;
`

const Add = styled.div`
    grid-column: 3;
    grid-row: 1/3;
    width: 100%;
    height: 100%;
    display: grid;
`

const Product = styled.div`
    width: 100%;
    min-height: 50px;
    border-top: 1px solid #e4e4e4;
    margin-top: 10px;
    padding: 15px 0 5px;
    display: grid;
    grid-template-columns: 44px auto;
    grid-column: 1 / 4;
`

const Edit = styled.div`
    margin: auto;
    grid-row: 1 / 3;
`

const Content = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    ${this}:nth-child(2) div {
    font-weight: bold;
    margin-top: auto;
`

const BaseNutritionDiaryBox = ({ t, index, products, openDialog, openEditProduct, token, router, prepareNumber, count, isDisabled, p, c, f }: useNutritionDiaryBoxProps) => {
    return (
        <Grid>
            <Bolded>{t('Meal')} {index + 1}</Bolded>
            <ExtraOptions>
                <div /> {/* Defaultly should be div or <MoreOptions isDisabled={isDisabled}/> basic on isOwner */}
            </ExtraOptions>
            <Add>
                {
                    token.login == router.query.login
                        ?
                        <IconButton disabled={isDisabled} sx={{ margin: 'auto' }} aria-label="Add" color="primary" onClick={() => openDialog()}>
                            <AddIcon fontSize="small" />
                        </IconButton>
                        :
                        <div />
                }
            </Add>
            <div>{prepareNumber(p)}{t('P')} {prepareNumber(c)}{t('C')} {prepareNumber(f)}{t('F')} {parseInt((p * 4 + c * 4 + f * 9).toString())}{t('Kcal')}</div>
            {
                products?.map((product: ProductSchemaProps & ActivitySchemaProps) => (
                    <Product key={product._id}>
                        <Edit>
                            {
                                token.login == router.query.login
                                    ?
                                    <IconButton onClick={() => openEditProduct(product)} aria-label="edit">
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    :
                                    <IconButton aria-label="edit">
                                        <FastfoodIcon fontSize="small" />
                                    </IconButton>
                            }
                        </Edit>
                        <Content>
                            <div>{product.name || product.activity}</div>
                            <div>{getCalories(product)}kcal</div>
                        </Content>
                        <Content>
                            {
                                product.how_many
                                    ?
                                    <>
                                        <div>{count(product, 'p')}{t('P')} {count(product, 'c')}{t('C')} {count(product, 'f')}{t('F')}</div>
                                        <div>{parseFloat(product.how_many.toString()) * 100}g/ml</div>
                                    </>
                                    :
                                    <></>
                            }
                        </Content>
                    </Product>
                ))
            }
        </Grid >
    );
};

export default BaseNutritionDiaryBox;