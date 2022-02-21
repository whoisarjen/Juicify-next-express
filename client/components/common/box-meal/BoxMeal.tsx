import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { getCalories, getMacronutrient } from '../../../utils/product.utils';
import styled from "styled-components";
import { useBoxMealProps } from "./useBoxMeal";
import AddProducts from "../dialog-add-products";

const Grid = styled.div`
    width: calc(100% - 24px);
    border: 1px solid #e4e4e4;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 12px;
    min-height: 50px;
    display: grid;
    grid-template-columns: auto 44px;
    font-size: 0.875rem;
`

const Bolded = styled.div`
    font-weight: bold;
`

const AddButtonContainer = styled.div`
    grid-column: 2;
    grid-row: 1/3;
    width: 100%;
    min-height: 44px;
    height: 100%;
    display: grid;
    margin: auto;
    ${this} div{
        margin: auto;
    }
`

const BaseBoxMeal = ({ children, t, index, token, router, macro, data }: useBoxMealProps) => {
    return (
        <Grid>
            <Bolded>{t('Meal')} {index + 1}</Bolded>
            <AddButtonContainer>
                {
                    token.login == router.query.login
                        ?
                        <AddProducts index={index} dailyMeasurement={data}>
                            <IconButton sx={{ margin: 'auto' }} aria-label="Add" color="primary">
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </AddProducts>
                        :
                        <div />
                }
            </AddButtonContainer>
            <div>{getMacronutrient(macro, 'p')?.toFixed(1)}{t('P')} {getMacronutrient(macro, 'c')?.toFixed(1)}{t('C')} {getMacronutrient(macro, 'f')?.toFixed(1)}{t('F')} {getCalories(macro)}Kcal</div>
            {children}
        </Grid >
    );
};

export default BaseBoxMeal;