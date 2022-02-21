import useTranslation from "next-translate/useTranslation";
import { useState, useEffect } from "react";
import { BoxProductProps } from ".";
import { useTheme } from "../../../hooks/useTheme";
import { deleteIndexedDB, addIndexedDB, getIndexedDBbyID, putIndexedDB } from "../../../utils/indexedDB.utils";

const useBoxProduct = ({ product, refreshCheckedProducts, openMoreInformation }: BoxProductProps) => {
    const { t } = useTranslation('nutrition-diary');
    const [checked, setChecked] = useState(false);
    const [value, setValue] = useState('1.0')
    const [fav, setFav] = useState(false)
    const { getTheme } = useTheme()

    const handleLike = async () => {
        if (fav) {
            setFav(false)
            await deleteIndexedDB('favourite_product', product._id)
        } else {
            setFav(true)
            await addIndexedDB('favourite_product', [product])
        }
    }

    const handleCheck = async () => {
        if (checked) {
            setChecked(false)
            await deleteIndexedDB('checked_product', product._id)
        } else {
            setChecked(true)
            await addIndexedDB('checked_product', [{ ...product, how_many: value }])
        }
        refreshCheckedProducts()
    }

    const handleValueChange = async (value: any) => {
        setValue(value)
        if (await getIndexedDBbyID('checked_product', product._id)) {
            await putIndexedDB('checked_product', product._id, 'how_many', value)
        }
        refreshCheckedProducts()
    }

    useEffect(() => {
        (async () => {
            await getIndexedDBbyID('favourite_product', product._id) ? setFav(true) : setFav(false)
            await getIndexedDBbyID('checked_product', product._id) ? setChecked(true) : setChecked(false)
        })
    }, [])

    return { product, openMoreInformation, getTheme, value, handleValueChange, checked, handleCheck, handleLike, fav, t }
}

export type useBoxProductProps = ReturnType<typeof useBoxProduct>

export default useBoxProduct;