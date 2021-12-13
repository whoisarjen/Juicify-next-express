import style from "../../styles/nutrition-diary.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import EditProduct from './EditProduct'
import MoreOptions from './MoreOptions'
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from 'react'

const MealBox = ({ index, products, openDialog }) => {
    const router = useRouter();
    const token = useSelector((state) => state.token.value);
    const [{ p, c, f }, setMacro] = useState({ p: 0, c: 0, f: 0 })

    useEffect(() => {
        let macro = { p: 0, c: 0, f: 0 }
        products.forEach(product => {
            macro = {
                p: (macro.p + product.p) || 0,
                c: (macro.c + product.c) || 0,
                f: (macro.f + product.f) || 0
            }
            setMacro(macro)
        })
    }, [products, index])

    return (
        <div className={style.box}>
            <div className={style.boxMeal}> Meal {index + 1}</div>
            <div className={style.boxExtraOptions}>
                {token.login === router.query.login ? (
                    <MoreOptions />
                ) : (
                    <div />
                )}
            </div>
            <div className={style.boxAdd}>
                {token.login === router.query.login ? (
                    <IconButton sx={{ margin: 'auto' }} aria-label="Add" color="primary" onClick={() => openDialog()}>
                        <AddIcon fontSize="small" />
                    </IconButton>
                ) : (
                    <div />
                )}
            </div>
            <div>{p}P {c}C {f}F {p * 4 + c * 4 + f * 9}Kcal</div>
            {
                products && products.map((product) => (
                    <div className={style.boxProduct} key={product._id}>
                        <div className={style.boxProductEdit}>
                            <EditProduct isOwner={token.login === router.query.login} />
                        </div>
                        <div className={style.boxProductContent}>
                            <div>{product.name}</div>
                            <div>{(product.p || 0) * 4 + (product.c || 0) * 4 + (product.f || 0) * 9}kcal</div>
                        </div>
                        <div className={style.boxProductContent}>
                            <div>{product.p || 0}P {product.c || 0}C {product.f || 0}F</div>
                            <div>100g/ml</div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default MealBox;