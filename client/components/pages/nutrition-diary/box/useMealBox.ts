import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { MealBoxProps } from ".";
import { useAppSelector } from "../../../../hooks/useRedux";

const useMealBox = ({ index, products, openDialog, openEditProduct }: MealBoxProps) => {
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

    return { t, index, products, openDialog, openEditProduct, token, router, prepareNumber, count, isDisabled, p, c, f }
}

export type useMealBoxProps = ReturnType<typeof useMealBox>

export default useMealBox;