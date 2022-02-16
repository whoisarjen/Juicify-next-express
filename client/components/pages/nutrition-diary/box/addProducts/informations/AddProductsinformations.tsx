import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AddProductsInformationsAdd from './add';
import { getProductInformations } from '../../../../../../utils/product.utils';
import styled from 'styled-components'
import SlideUp from '../../../../../transition/SlideUp';
import { useAddProductsinformationsProps } from './useAddProductsinformations';

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

const BaseAddProductsInformations = ({ loadedProduct, handleClose, dailyMeasurement, t, isAdd, setIsAdd }: useAddProductsinformationsProps) => {
    return (
        <Dialog
            fullScreen
            open={loadedProduct ? true : false}
            TransitionComponent={SlideUp}
        >
            <Grid>
                {
                    Object.keys(loadedProduct).length > 0 &&
                    (
                        <ul>
                            {
                                Object.keys(getProductInformations(loadedProduct)).map(x =>
                                    <li key={x}>{t(x)}: {getProductInformations(loadedProduct)[x]}</li>
                                )
                            }
                        </ul>
                    )
                }
                <Placeholder />
                <Close onClick={() => setIsAdd(true)}>
                    <Button variant="contained">
                        {t('ADD_TO_DIARY')}
                    </Button>
                </Close>
                <Placeholder />
                <Close onClick={handleClose}>
                    <Button variant="contained">
                        {t('Close')}
                    </Button>
                </Close>
            </Grid>
            <AddProductsInformationsAdd isAdd={isAdd} dailyMeasurement={dailyMeasurement} setIsAdd={setIsAdd} loadedProduct={loadedProduct} />
        </Dialog>
    )
}

export default BaseAddProductsInformations;