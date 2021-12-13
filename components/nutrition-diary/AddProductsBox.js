import styles from '../../styles/nutrition-diary.module.css'
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useEffect } from 'react'
import { putIndexedDB, addIndexedDB, deleteIndexedDB, getIndexedDBbyID } from '../../hooks/useIndexedDB';
import { useState } from 'react'

const AddProductsBox = ({ product, refreshCheckedProducts }) => {
    const [checked, setChecked] = useState(false);
    const [value, setValue] = useState('1.0')
    const [fav, setFav] = useState(false)

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

    const handleValueChange = async (e) => {
        setValue(e.target.value)
        if (await getIndexedDBbyID('checked_product', product._id)) {
            await putIndexedDB('checked_product', product._id, 'how_many', e.target.value)
        }
    }

    useEffect(async () => {
        await getIndexedDBbyID('favourite_product', product._id) ? setFav(true) : setFav(false)
        await getIndexedDBbyID('checked_product', product._id) ? setChecked(true) : setChecked(false)
    }, [])

    return (
        <div className={styles.addProductsBox} style={{ borderLeft: product.v ? '5px solid #1976d2' : '' }}>
            <div className={styles.addProductsBoxName}>
                {product.name}
            </div>
            <div className={styles.addProductsBoxDescription}>
                {(product.p || 0)}P {(product.c || 0)}W {(product.f || 0)}F {Math.ceil((product.p || 0) * 4 + (product.c || 0) * 4 + (product.f || 0) * 9)}kcal
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