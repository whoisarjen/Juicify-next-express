import MoreOptions from './MoreOptions'
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useAppSelector } from "../../hooks/useRedux";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import useTranslation from "next-translate/useTranslation";
import style from "../../styles/nutrition-diary.module.css";
import { useState, useEffect, FunctionComponent } from 'react'
import NutritionDiary from '../../classes/nutritionDiary';
import NutritionDiaryProps from '../../interfaces/nutritionDiary';

interface MealBoxProps {
    index: number,
    products: Array<NutritionDiaryProps>,
    openDialog: () => void,
    openEditProduct: (arg0: NutritionDiaryProps) => void
}

const MealBox: FunctionComponent<MealBoxProps> = ({ index, products, openDialog, openEditProduct }) => {
    const { t } = useTranslation('nutrition-diary');
    const router = useRouter();
    const token: any = useAppSelector((state) => state.token.value);
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
    }, [products, index, router.query.date])

    return (
        <div className={style.box}>
            <div className={style.boxMeal}>{t('Meal')} {index + 1}</div>
            <div className={style.boxExtraOptions}>
                {
                    token.login == router.query.login ? (
                        <MoreOptions />
                    ) : (
                        <div />
                    )
                }
            </div>
            <div className={style.boxAdd}>
                {
                    token.login == router.query.login ? (
                        <IconButton sx={{ margin: 'auto' }} aria-label="Add" color="primary" onClick={() => openDialog()}>
                            <AddIcon fontSize="small" />
                        </IconButton>
                    ) : (
                        <div />
                    )
                }
            </div>
            <div>{prepareNumber(p)}{t('P')} {prepareNumber(c)}{t('C')} {prepareNumber(f)}{t('F')} {parseInt((p * 4 + c * 4 + f * 9).toString())}{t('Kcal')}</div>
            {
                products && products.map((product: NutritionDiaryProps) => (
                    <div className={style.boxProduct} key={product._id}>
                        <div className={style.boxProductEdit}>
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
                        </div>
                        <div className={style.boxProductContent}>
                            <div>{product.name || product.activity}</div>
                            <div>{new NutritionDiary(product).getCalories()}kcal</div>
                        </div>
                        <div className={style.boxProductContent}>
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
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default MealBox;