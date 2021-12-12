import { forwardRef, useState, Fragment } from 'react'
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide'
import Button from '@mui/material/Button';
import styles from '../../styles/nutrition-diary.module.css'
import connectAPI from '../../api/connectAPI'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { addIndexedDB, getAllIndexedDB, getIndexedDBbyID } from '../../functions/indexedDB'
import AddProductsBox from './AddProductsBox';
import { useEffect } from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddProducts = ({ index, isDialogOpen, closeDialog }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [searchTimer, setSearchTimer] = useState(null)
    const [searchCache, setSearchCache] = useState([])
    const [meal, setMeal] = useState(index)
    const token = useSelector(state => state.token.value)

    const searchFunction = (find) => setTimeout(async () => {
        console.log("Products loaded from API")
        setOpen(false);
        setLoading(true);
        const { response, isSuccess } = await connectAPI("/find/products", {
            find: find
        });
        if (isSuccess) {
            setProducts(response.products)
            await addIndexedDB('cache_product', [{ _id: find, whenAdded: new Date(), products: response.products }])
            setSearchCache([...searchCache, find])
        }
        setLoading(false)
    }, 1500)

    const handleLoad = async (value) => {
        clearTimeout(searchTimer)
        if (value.length > 2) {
            setLoading(true)
            const cache = await getIndexedDBbyID('cache_product', value)
            if (cache && cache.products.length > 0) {
                console.log("Products loaded from cache")
                setProducts(cache.products)
                setLoading(false)
                setOpen(false);
            } else {
                setSearchTimer(searchFunction(value))
            }
        }
    }

    useEffect(() => setMeal(index), [index])
    useEffect(async () => setSearchCache((await getAllIndexedDB('cache_product')).map(product => product._id)), [])

    return (
        <div className={styles.addProducts}>
            <Dialog
                fullScreen
                scroll='body'
                open={isDialogOpen}
                TransitionComponent={Transition}
            >
                <div className="content">
                    <div className="title">Add products</div>
                    <Select
                        sx={{ marginBottom: '10px' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={meal}
                        onChange={(e) => setMeal(e.target.value)}
                    >
                        {
                            [...Array(token.meal_number)].map((x, i) => 
                                <MenuItem key={i} value={i}>Meal {i + 1}</MenuItem>
                            )
                        }
                    </Select>
                    <Autocomplete
                        sx={{ marginBottom: '10px' }}
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        isOptionEqualToValue={(option, value) => option === value}
                        getOptionLabel={(option) => option}
                        options={searchCache}
                        loading={loading}
                        onInputChange={(e, value) => handleLoad(value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search product"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <Fragment>
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </Fragment>
                                    ),
                                }}
                            />
                        )}
                    />
                    {
                        products.map(product =>
                            <AddProductsBox product={product} key={product._id} />
                        )
                    }
                    <div className={styles.addProductsCloseButtonPlaceholder} />
                    <div className={styles.addProductsCloseButton} onClick={() => closeDialog()}>
                        <Button variant="contained">
                            Close
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default AddProducts;