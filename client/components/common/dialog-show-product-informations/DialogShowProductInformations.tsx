import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogAddProduct from '../dialog-add-product';
import { getProductInformations } from '../../../utils/product.utils';
import styled from 'styled-components'
import SlideUp from '../../transition/SlideUp';
import { useDialogShowProductInformationsProps } from './useDialogShowProductInformations';
import ButtonCloseDialog from '../button-close-dialog';

const Close = styled.div`
    display: grid;
    width: calc(100% - 10px);
    padding: 3.75px 5px;
    position: fixed;
    bottom: 40px;
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

const BaseDialogShowProductInformations = ({ loadedProduct, handleClose, dailyMeasurement, t }: useDialogShowProductInformationsProps) => {
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
                <DialogAddProduct dailyMeasurement={dailyMeasurement} loadedProduct={loadedProduct}>
                    <Placeholder />
                    <Close>
                        <Button variant="contained">
                            {t('ADD_TO_DIARY')}
                        </Button>
                    </Close>
                </DialogAddProduct>
                <ButtonCloseDialog clicked={handleClose} />
            </Grid>
        </Dialog>
    )
}

export default BaseDialogShowProductInformations;