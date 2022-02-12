import { forwardRef, useState, useEffect, Fragment, FunctionComponent, ReactElement, Ref } from 'react'
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import AddProductsBox from './AddBox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useAppSelector } from '../../hooks/useRedux';
import useFind from '../../hooks/useFind';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useTranslation from "next-translate/useTranslation";
import { getAllIndexedDB, deleteIndexedDB } from '../../utils/indexedDB.utils';
import CreateProduct from './Create';
import { TransitionProps } from '@material-ui/core/transitions';
import BottomFlyingButton from '../common/BottomFlyingButton';
import AddProductMoreInformation from './AddMoreInformations';
import { DailyMeasurementSchemaProps } from '../../schema/dailyMeasurement.schema';
import { ProductSchemaProps } from '../../schema/product.schema';
import styled from 'styled-components'
import { insertThoseIDStoDBController } from '../../utils/db.utils'

interface AddproductsProps {
    index: number,
    isAddDialog: boolean,
    closeDialog: () => void,
    dailyMeasurement: DailyMeasurementSchemaProps,
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

const Close = styled.div`
    display: grid;
    width: calc(100% - 10px);
    padding: 3.75px 5px;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background: var(--theme-background);
    z-index: 2;
`

const Placeholder = styled.div`
    width: 100%;
    height: 44px;
`

const AddProducts: FunctionComponent<AddproductsProps> = ({ index, isAddDialog, closeDialog, dailyMeasurement, reload }) => {
    const [loadedProduct, setLoadedProduct] = useState<any>(false)
    const { t } = useTranslation('nutrition-diary');
    const [tab, setTab] = useState(0)
    const [open, setOpen] = useState(false)
    const [meal, setMeal] = useState(index)
    const [checked, setChecked] = useState([])
    const token: any = useAppSelector(state => state.token.value)
    const [refreshChecked, setRefreshChecked] = useState(0)
    const [loadingButton, setLoadingButton] = useState(false)
    const [isCreateProduct, setIsCreateProduct] = useState(false)
    const [find, setFind] = useState<any>(null)
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
        const array: Array<ProductSchemaProps> = JSON.parse(JSON.stringify(checked))
        const time = new Date().getTime()
        array.map(async (x: ProductSchemaProps, i: number) => {
            x.meal = meal
            x.product_ID = x._id
            x._id = 'XD' + time + i
            await deleteIndexedDB('checked_product', x.product_ID)
            return x
        })
        setChecked([])
        if (!dailyMeasurement.nutrition_diary) dailyMeasurement.nutrition_diary = []
        dailyMeasurement.nutrition_diary = dailyMeasurement.nutrition_diary.concat(array)
        await insertThoseIDStoDBController('daily_measurement', [dailyMeasurement])
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
        <Dialog
            fullScreen
            scroll='body'
            open={isAddDialog}
            TransitionComponent={Transition}
        >
            <div className="contentWithoutHeight">
                <div className="title">{t('Add products')}</div>
                <Select
                    sx={{ marginBottom: '10px' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={meal}
                    fullWidth
                    onChange={(e) => setMeal(parseInt(e.target.value.toString()))}
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
                    items && items.map((product: ProductSchemaProps) =>
                        <AddProductsBox refreshCheckedProducts={() => setRefreshChecked(refreshChecked + 1)} product={product} key={product._id} openMoreInformation={() => setLoadedProduct(product)} />
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
                <Placeholder />
                <Close onClick={() => closeDialog()}>
                    <Button variant="contained">
                        {t('Close')}
                    </Button>
                </Close>
            </div>
            <AddProductMoreInformation handleClose={() => setLoadedProduct(false)} loadedProduct={loadedProduct} dailyMeasurement={dailyMeasurement} />
        </Dialog>
    );
}

export default AddProducts;