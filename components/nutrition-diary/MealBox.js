import EditProduct from './EditProduct'
import MoreOptions from './MoreOptions'
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import style from "../../styles/nutrition-diary.module.css";

const MealBox = ({ index, products, openDialog }) => {
    const router = useRouter();
    const token = useSelector((state) => state.token.value);
    const [{ p, c, f }, setMacro] = useState({ p: 0, c: 0, f: 0 })

    const count = (product, key) => (Math.round((product[key] * product.how_many) * 100) / 100).toFixed(1) || 0

    useEffect(() => {
        let macro = { p: 0, c: 0, f: 0 }
        products.forEach(product => {
            macro = {
                p: (macro.p + parseFloat(count(product, 'p'))),
                c: (macro.c + parseFloat(count(product, 'c'))),
                f: (macro.f + parseFloat(count(product, 'f')))
            }
        })
        setMacro(macro)
    }, [products, index, router.query.date])

    return (
        <div className={style.box}>
            <div className={style.boxMeal}> Meal {index + 1}</div>
            <div className={style.boxExtraOptions}>
                {
                    token.login === router.query.login ? (
                        <MoreOptions />
                    ) : (
                        <div />
                    )
                }
            </div>
            <div className={style.boxAdd}>
                {
                    token.login === router.query.login ? (
                        <IconButton sx={{ margin: 'auto' }} aria-label="Add" color="primary" onClick={() => openDialog()}>
                            <AddIcon fontSize="small" />
                        </IconButton>
                    ) : (
                        <div />
                    )
                }
            </div>
            <div>{p}P {c}C {f}F {parseInt(p * 4 + c * 4 + f * 9)}Kcal</div>
            {
                products && products.map((product) => (
                    <div className={style.boxProduct} key={product._id}>
                        <div className={style.boxProductEdit}>
                            <EditProduct isOwner={token.login === router.query.login} />
                        </div>
                        <div className={style.boxProductContent}>
                            <div>{product.name}</div>
                            <div>{parseInt((count(product, 'p')) * 4 + (count(product, 'c')) * 4 + (count(product, 'f')) * 9)}kcal</div>
                        </div>
                        <div className={style.boxProductContent}>
                            <div>{count(product, 'p')}P {count(product, 'c')}C {count(product, 'f')}F</div>
                            <div>100g/ml</div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default MealBox;