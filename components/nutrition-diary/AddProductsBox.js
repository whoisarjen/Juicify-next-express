import styles from '../../styles/nutrition-diary.module.css'
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react'

const AddProductsBox = ({ product }) => {
    const [checked, setChecked] = useState(false);
    const [value, setValue] = useState('1.0')

    return (
        <div className={styles.addProductsBox} style={{ borderLeft: product.v ? '5px solid #1976d2' : '' }}>
            <div className={styles.addProductsBoxName}>
                {product.name}
            </div>
            <div className={styles.addProductsBoxDescription}>
                {(product.p || 0)}P {(product.c || 0)}W {(product.f || 0)}F {Math.ceil((product.p || 0) * 4 + (product.c || 0) * 4 + (product.f || 0) * 9)}kcal
            </div>
            <div className={styles.addProductsBoxFavourite}>
                <Checkbox icon={<FavoriteBorder fontSize="small"/>} checkedIcon={<Favorite fontSize="small"/>} />
            </div>
            <div className={styles.addProductsBoxMoreInfo}>
                <IconButton color="primary">
                    <InfoIcon fontSize="small"/>
                </IconButton>
            </div>
            <div className={styles.addProductsBoxValue}>
                <TextField type="number" value={value} onChange={(e) => setValue(e.target.value)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
            </div>
            <div className={styles.addProductsBoxSubmit}>
                <Checkbox
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </div>
        </div>
    );
}

export default AddProductsBox;