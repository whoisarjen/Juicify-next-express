import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useAppSelector } from "../../hooks/useRedux";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import useTranslation from "next-translate/useTranslation";
import { useState, useEffect, FunctionComponent } from 'react'
import { getCalories } from '../../utils/product.utils';
import { ProductSchemaProps } from '../../schema/product.schema';
import { ActivitySchemaProps } from '../../schema/activity.schema';
import styled from "styled-components";

interface MealBoxProps {
    index: number,
    products: Array<ProductSchemaProps & ActivitySchemaProps>,
    openDialog: () => void,
    openEditProduct: (arg0: ProductSchemaProps & ActivitySchemaProps) => void
}

const Box = styled.div`
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

const MealBox: FunctionComponent<MealBoxProps> = ({ index, products, openDialog, openEditProduct }) => {
    const { t } = useTranslation('nutrition-diary');
    const router: any = useRouter();
    const token: any = useAppSelector((state) => state.token.value);
    const isOnline = useAppSelector(state => state.online.isOnline)
    const theOldestSupportedDate = useAppSelector(state => state.config.theOldestSupportedDate)
    const [isDisabled, setIsDisabled] = useState(false)
    const [{ p, c, f }, setMacro] = useState({ p: 0, c: 0, f: 0 })

    const prepareNumber = (number: number) => parseFloat((Math.round(number * 100) / 100).toFixed(1))
    const count = (product: any, key: string) => parseFloat((Math.round((product[key] * product.how_many) * 100) / 100).toFixed(1)) || 0

    useEffect(() => {
        let macro = { p: 0, c: 0, f: 0 }
        products.forEach(product => {
            macro = {
                p: (macro.p + count(product, 'p')),
                c: (macro.c + count(product, 'c')),
                f: (macro.f + count(product, 'f'))
            }
        })
        setMacro(macro)
        setIsDisabled(!isOnline && router.query.date < theOldestSupportedDate())
    }, [products, index, router.query.date, theOldestSupportedDate, isOnline])

    return (
        <Box>
            <Bolded>{t('Meal')} {index + 1}</Bolded>
            <ExtraOptions>
                {
                    token.login == router.query.login ? (
                        // <MoreOptions isDisabled={isDisabled}/>
                        <div />
                    ) : (
                        <div />
                    )
                }
            </ExtraOptions>
            <Add>
                {
                    token.login == router.query.login ? (
                        <IconButton disabled={isDisabled} sx={{ margin: 'auto' }} aria-label="Add" color="primary" onClick={() => openDialog()}>
                            <AddIcon fontSize="small" />
                        </IconButton>
                    ) : (
                        <div />
                    )
                }
            </Add>
            <div>{prepareNumber(p)}{t('P')} {prepareNumber(c)}{t('C')} {prepareNumber(f)}{t('F')} {parseInt((p * 4 + c * 4 + f * 9).toString())}{t('Kcal')}</div>
            {
                products && products.map((product: ProductSchemaProps & ActivitySchemaProps) => (
                    <Product key={product._id}>
                        <Edit>
                            {
                                token.login == router.query.login ? (
                                    <IconButton onClick={() => openEditProduct(product)} aria-label="edit">
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                ) : (
                                    <IconButton aria-label="edit">
                                        <FastfoodIcon fontSize="small" />
                                    </IconButton>
                                )
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
        </Box>
    );
};

export default MealBox;