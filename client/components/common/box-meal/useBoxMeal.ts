import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BoxMealProps } from ".";
import { useAppSelector } from "../../../hooks/useRedux";
import { getMacronutrient } from '../../../utils/product.utils'

const useBoxMeal = ({ children, index, products, data }: BoxMealProps) => {
    const { t } = useTranslation('nutrition-diary');
    const router: any = useRouter();
    const token: any = useAppSelector((state) => state.token.value);
    const [macro, setMacro] = useState({ p: 0, c: 0, f: 0 })

    useEffect(() => {
        let countmacro = { p: 0, c: 0, f: 0 }
        products.forEach(product => {
            countmacro = {
                p: (countmacro.p + getMacronutrient(product, 'p')),
                c: (countmacro.c + getMacronutrient(product, 'c')),
                f: (countmacro.f + getMacronutrient(product, 'f'))
            }
        })
        setMacro(countmacro)
    }, [products, index, router.query.date])

    return { children, t, index, data, token, router, macro }
}

export type useBoxMealProps = ReturnType<typeof useBoxMeal>

export default useBoxMeal;