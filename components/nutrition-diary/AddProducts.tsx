import { forwardRef, useState, useEffect, Fragment, FunctionComponent, ReactElement, Ref } from 'react'
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
import { useAppSelector } from '../../hooks/useRedux';
import useFind from '../../hooks/useFind';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useTranslation from "next-translate/useTranslation";
import { getAllIndexedDB, deleteIndexedDB } from '../../utils/indexedDB';
import { insertThoseIDStoDB, is_id, overwriteThoseIDSinDB } from '../../utils/API'
import CreateProduct from './CreateProduct';
import { TransitionProps } from '@material-ui/core/transitions';
import BottomFlyingButton from '../common/BottomFlyingButton';

interface AddproductsProps {
    index: number,
    isAddDialog: boolean,
    closeDialog: () => void,
    dailyMeasurement: any,
    reload: () => void
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddProducts: FunctionComponent<AddproductsProps> = ({ index, isAddDialog, closeDialog, dailyMeasurement, reload }) => {
    const { t } = useTranslation('nutrition-diary');
    const [tab, setTab] = useState(0)
    const [find, setFind] = useState<string | null>(null)
    const [open, setOpen] = useState(false)
    const [meal, setMeal] = useState<any>(index)
    const [checked, setChecked] = useState([])
    const token: any = useAppSelector(state => state.token.value)
    const [refreshChecked, setRefreshChecked] = useState(0)
    const [loadingButton, setLoadingButton] = useState(false)
    const [isCreateProduct, setIsCreateProduct] = useState(false)
    const { items, loading, searchCache } = useFind(find, 'product', tab)

    const created = async (productName: string) => {
        if (productName == find) {
            setFind(null)
        } else {
            setFind(productName)
        }
        setIsCreateProduct(false)
    }

    const addProductsToDiary = async () => {
        setLoadingButton(true)
        let object = JSON.parse(JSON.stringify(checked))
        const time = new Date().getTime()
        object.map(async (x: any, i: number) => {
            x.meal = meal
            x.product_ID = x._id
            x._id = 'XD' + time + i
            await deleteIndexedDB('checked_product', x.product_ID)
            return x
        })
        setChecked([])
        if (!dailyMeasurement.nutrition_diary) dailyMeasurement.nutrition_diary = []
        dailyMeasurement.nutrition_diary = dailyMeasurement.nutrition_diary.concat(object)
        if (await is_id(dailyMeasurement._id)) {
            await overwriteThoseIDSinDB('daily_measurement', [dailyMeasurement])
        } else {
            await insertThoseIDStoDB('daily_measurement', [dailyMeasurement])
        }
        reload()
        setLoadingButton(false)
        closeDialog()
    }

    useEffect(() => setMeal(index), [index])
    useEffect(() => setOpen(false), [searchCache])
    useEffect(() => {
        (async () => {
            setChecked(await getAllIndexedDB('checked_product') || [])
        })()
    }, [refreshChecked])

    return (
        <div className={styles.addProducts}>
            <Dialog
                fullScreen
                scroll='body'
                open={isAddDialog}
                TransitionComponent={Transition}
            >
                <div className="content">
                    <div className="title">{t('Add products')}</div>
                    <Select
                        sx={{ marginBottom: '10px' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={meal}
                        onChange={(e) => setMeal(e.target.value)}
                    >
                        {
                            [...Array(token.meal_number)].map((x, i) =>
                                <MenuItem key={i} value={i}>{t('Meal')} {i + 1}</MenuItem>
                            )
                        }
                    </Select>
                    <Autocomplete
                        sx={{ marginBottom: '10px', width: '100%' }}
                        open={open}
                        value={find}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        isOptionEqualToValue={(option, value) => option === value}
                        getOptionLabel={option => option ? option : ''}
                        options={searchCache}
                        loading={loading}
                        onInputChange={(e, value) => setFind(value.trim().toLowerCase())}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={t('Search')}
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
                        <Tab wrapped label={t('All')} />
                        <Tab wrapped label={t('Favourite')} />
                        <Tab wrapped label={`${t('Selected')} (${checked.length})`} />
                    </Tabs>
                    {
                        items && items.map((product: any) =>
                            <AddProductsBox refreshCheckedProducts={() => setRefreshChecked(refreshChecked + 1)} product={product} key={product._id} />
                        )
                    }
                    <div className='contentGridPureWidth'>
                        <Button variant="outlined" onClick={() => setIsCreateProduct(true)} sx={{ margin: 'auto' }}>
                            {t('Create product')}
                        </Button>
                    </div>
                    <CreateProduct
                        created={created}
                        isCreateProduct={isCreateProduct}
                        closeCreateProduct={() => setIsCreateProduct(false)}
                    />
                    {
                        checked && checked.length > 0 &&
                        <BottomFlyingButton clicked={addProductsToDiary} isLoading={loadingButton} showNumberValue={checked.length} />
                    }
                    <div className={styles.addProductsCloseButtonPlaceholder} />
                    <div className={styles.addProductsCloseButton} onClick={() => closeDialog()}>
                        <Button variant="contained">
                            {t('Close')}
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default AddProducts;