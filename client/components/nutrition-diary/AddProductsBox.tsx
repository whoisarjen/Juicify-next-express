import styles from '../../styles/nutrition-diary.module.css'
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { FunctionComponent, useEffect, useState } from 'react'
import { putIndexedDB, addIndexedDB, deleteIndexedDB, getIndexedDBbyID } from '../../utils/indexedDB';
import useTranslation from "next-translate/useTranslation";
import countCalories from './utils/countCalories';
import { useTheme } from '../../hooks/useTheme';

interface AddproductsBoxProps {
    product: any,
    refreshCheckedProducts: () => void
}

const AddProductsBox: FunctionComponent<AddproductsBoxProps> = ({ product, refreshCheckedProducts }) => {
    const { t } = useTranslation('nutrition-diary');
    const [checked, setChecked] = useState(false);
    const [value, setValue] = useState('1.0')
    const [fav, setFav] = useState(false)
    const [getTheme]: any = useTheme()

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

    const handleValueChange = async (e: any) => {
        setValue(e.target.value)
        if (await getIndexedDBbyID('checked_product', product._id)) {
            await putIndexedDB('checked_product', product._id, 'how_many', e.target.value)
        }
        refreshCheckedProducts()
    }

    useEffect(() => {
        (async () => {
            await getIndexedDBbyID('favourite_product', product._id) ? setFav(true) : setFav(false)
            await getIndexedDBbyID('checked_product', product._id) ? setChecked(true) : setChecked(false)
        })
    }, [])

    return (
        <div className={styles.addProductsBox} style={{ borderLeft: product.v ? `5px solid ${getTheme('PRIMARY')}` : '' }}>
            <div className={styles.addProductsBoxName} style={{ color: getTheme('PRIMARY') }}>
                {product.name}
            </div>
            <div className={styles.addProductsBoxDescription}>
                {(product.p || 0)}{t('P')} {(product.c || 0)}{t('C')} {(product.f || 0)}{t('F')} {countCalories(product)}kcal
            </div>
            <div className={styles.addProductsBoxFavourite} onClick={handleLike}>
                <Checkbox checked={fav} icon={<FavoriteBorder fontSize="small" />} checkedIcon={<Favorite fontSize="small" />} />
            </div>
            <div className={styles.addProductsBoxMoreInfo}>
                <IconButton color="primary">
                    <InfoIcon fontSize="small" />
                </IconButton>
            </div>
            <div className={styles.addProductsBoxValue}>
                <TextField type="number" value={value} onChange={(e) => handleValueChange(e)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
            </div>
            <div className={styles.addProductsBoxSubmit} onChange={handleCheck}>
                <Checkbox
                    checked={checked}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </div>
        </div>
    );
}

export default AddProductsBox;