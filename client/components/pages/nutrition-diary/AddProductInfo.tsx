import React, { forwardRef, ReactElement, Ref, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import useTranslation from 'next-translate/useTranslation';
import AddProductMoreInformationAdd from './AddProductInfoAdd';
import { getProductInformations } from '../../../utils/product.utils';
import styled from 'styled-components'

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface AddProductMoreInformationProps {
    loadedProduct: any,
    handleClose: () => void,
    dailyMeasurement: any
}

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

const AddProductMoreInformation = ({ loadedProduct, handleClose, dailyMeasurement }: AddProductMoreInformationProps) => {
    const { t } = useTranslation('nutrition-diary');
    const [isAdd, setIsAdd] = useState(false)

    return (
        <>
            <Dialog
                fullScreen
                open={loadedProduct ? true : false}
                TransitionComponent={Transition}
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
                <AddProductMoreInformationAdd isAdd={isAdd} dailyMeasurement={dailyMeasurement} setIsAdd={setIsAdd} loadedProduct={loadedProduct} />
            </Dialog>
        </>
    )
}

export default AddProductMoreInformation;