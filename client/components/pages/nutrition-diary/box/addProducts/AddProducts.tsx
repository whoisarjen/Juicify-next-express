import { Fragment } from 'react'
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import AddProductsBox from '../../../../common/box-product';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CreateProduct from './create';
import BottomFlyingButton from '../../../../common/button-submit-items';
import AddProductMoreInformation from './informations';
import { ProductSchemaProps } from '../../../../../schema/product.schema';
import styled from 'styled-components'
import SlideUp from '../../../../transition/SlideUp';
import { useAddProductsProps } from './useAddProducts';
import AddItemsTabs from '../../../../common/tabs-items';
import NavbarOnlyTitle from '../../../../common/navbar-only-title';

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

const Grid = styled.div`
    width: 100%;
    margin: 0 auto;
    max-width: 702px;
    padding: 12px;
    display: grid;
    min-height: calc(100vh - var(--BothNavHeightAndPadding));
    ${this} {
        min-height: auto;
    }
    @media (max-width: 726px) {
        ${this} {
            width: calc(100% - 24px);
        }
    }
`

const GridFullWidth = styled.div`
    display: grid;
    width: 100%;
`

const BaseAddProducts = ({ children, isDialog, setIsDialog, t, dailyMeasurement, meal, setMeal, open, setOpen, find, setFind, setTab, loading, searchCache, token, items, addProductsToDiary, isCreateProduct, setIsCreateProduct, setRefreshChecked, loadedProduct, setLoadedProduct, checked, created, refreshChecked }: useAddProductsProps) => {
    return (
        <>
            <div onClick={() => setIsDialog(true)}>{children}</div>
            <Dialog
                fullScreen
                scroll='body'
                open={isDialog}
                TransitionComponent={SlideUp}
            >
                <Grid>
                    <NavbarOnlyTitle title="home:ADD_PRODUCTS" />
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
                    <AddItemsTabs changeTab={(value) => setTab(value)} checkedLength={checked.length} />
                    {
                        items?.length > 0 && items.map((product: ProductSchemaProps) =>
                            <AddProductsBox refreshCheckedProducts={() => setRefreshChecked(refreshChecked + 1)} product={product} key={product._id} openMoreInformation={() => setLoadedProduct(product)} />
                        )
                    }
                    <GridFullWidth>
                        <Button variant="outlined" onClick={() => setIsCreateProduct(true)} sx={{ margin: 'auto' }}>
                            {t('Create product')}
                        </Button>
                    </GridFullWidth>
                    <CreateProduct
                        created={created}
                        isCreateProduct={isCreateProduct}
                        closeCreateProduct={() => setIsCreateProduct(false)}
                    />
                    <BottomFlyingButton clicked={addProductsToDiary} showNumber={checked.length} />
                    <Placeholder />
                    <Close onClick={() => setIsDialog(false)}>
                        <Button variant="contained">
                            {t('Close')}
                        </Button>
                    </Close>
                </Grid>
                <AddProductMoreInformation handleClose={() => setLoadedProduct(false)} loadedProduct={loadedProduct} dailyMeasurement={dailyMeasurement} />
            </Dialog>
        </>
    );
}

export default BaseAddProducts;