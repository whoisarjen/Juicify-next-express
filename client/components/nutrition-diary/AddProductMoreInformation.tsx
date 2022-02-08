import React, { forwardRef, FunctionComponent, ReactElement, Ref } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import styles from '../../styles/nutrition-diary.module.css'
import useTranslation from 'next-translate/useTranslation';

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
    handleClose: () => void
}

const AddProductMoreInformation: FunctionComponent<AddProductMoreInformationProps> = ({ loadedProduct, handleClose }) => {
    const { t } = useTranslation('nutrition-diary');

    return (
        <>
            <Dialog
                fullScreen
                open={loadedProduct ? true : false}
                TransitionComponent={Transition}
            >
                <div className="contentWithoutHeight">
                    {
                        Object.keys(loadedProduct).length > 0 &&
                        (
                            <ul>
                                {
                                    Object.keys(loadedProduct).map(x =>
                                        <li key={x}>{x}: {loadedProduct[x]}</li>
                                    )
                                }
                            </ul>
                        )
                    }
                    <div className={styles.addProductsCloseButtonPlaceholder} />
                    <div className={styles.addProductsCloseButton} onClick={handleClose}>
                        <Button variant="contained">
                            {t('Close')}
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default AddProductMoreInformation;