import { forwardRef, useState, useEffect, Fragment } from 'react'
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide'
import Button from '@mui/material/Button';
import styles from '../../styles/nutrition-diary.module.css'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import AddProductsBox from './AddProductsBox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import useFind from '../../hooks/useFind';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LoadingButton from '@mui/lab/LoadingButton';
import { getAllIndexedDB, addIndexedDB, deleteIndexedDB } from '../../utils/indexedDB';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddProducts = ({ index, isDialogOpen, closeDialog, dailyMeasurement, reloadDailyMeasurement }) => {
    const [tab, setTab] = useState(0)
    const [find, setFind] = useState('')
    const [open, setOpen] = useState(false)
    const [meal, setMeal] = useState(index)
    const [checked, setChecked] = useState([])
    const token = useSelector(state => state.token.value)
    const [refreshChecked, setRefreshChecked] = useState(0)
    const [loadingButton, setLoadingButton] = useState(false)
    const { products, loading, searchCache } = useFind(find, 'product', tab)

    const addProductsToDiary = async () => {
        setLoadingButton(true)
        // console.log("Adding to diary...")
        // setTimeout(async () => {
        // delete from checked
        // add to DB
        let object = checked
        object.map(async x => {
            x.meal = index
            x.product_ID = x._id
            delete x._id

            await deleteIndexedDB('checked_product', x.product_ID)
        })
        setChecked([])
        dailyMeasurement.nutrition_diary = dailyMeasurement.nutrition_diary.concat(object)
        console.log(dailyMeasurement)
        await deleteIndexedDB('daily_measurement', dailyMeasurement.whenAdded)
        await addIndexedDB('daily_measurement', [dailyMeasurement])

        reloadDailyMeasurement()
        // }, 1500)
        setLoadingButton(false)
        closeDialog()
    }

    useEffect(() => setMeal(index), [index])
    useEffect(() => setOpen(false), [searchCache])
    useEffect(async () => setChecked(await getAllIndexedDB('checked_product') || []), [refreshChecked])

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
                        value={find}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        isOptionEqualToValue={(option, value) => option === value}
                        getOptionLabel={(option) => option}
                        options={searchCache}
                        loading={loading}
                        onInputChange={(e, value) => setFind(value.trim().toLowerCase())}
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
                    <Tabs
                        value={tab}
                        onChange={(e, value) => setTab(value)}
                        indicatorColor="primary"
                        textColor="inherit"
                        variant="fullWidth"
                        sx={{ marginBottom: '10px' }}
                    >
                        <Tab wrapped label="All" />
                        <Tab wrapped label="Favourite" />
                        <Tab wrapped label={`Selected (${checked.length})`} />
                    </Tabs>
                    {
                        products && products.map(product =>
                            <AddProductsBox refreshCheckedProducts={() => setRefreshChecked(refreshChecked + 1)} product={product} key={product._id} />
                        )
                    }
                    {
                        checked && checked.length > 0 &&
                        <>
                            <div className={styles.addProductsSubmit}>
                                <LoadingButton
                                    onClick={addProductsToDiary}
                                    loading={loadingButton}
                                    variant="contained"
                                >
                                    Submit ({checked.length})
                                </LoadingButton>
                            </div>
                            <div className={styles.addProductsSubmitPlaceholder} />
                        </>
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