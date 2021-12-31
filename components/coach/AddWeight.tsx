import { forwardRef, FunctionComponent, ReactElement, Ref } from 'react'
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide'
import Button from '@mui/material/Button';
import styles from '../../styles/nutrition-diary.module.css'
import { TransitionProps } from '@material-ui/core/transitions';
import useTranslation from "next-translate/useTranslation";
import TimelineComponent from './TimelineComponent';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface AddWeightProps {
    isAddDialog: boolean,
    closeDialog: () => void
}

const AddWeight: FunctionComponent<AddWeightProps> = ({ isAddDialog, closeDialog }) => {
    const { t } = useTranslation('home');

    return (
        <div>
            <Dialog
                fullScreen
                scroll='body'
                open={isAddDialog}
                TransitionComponent={Transition}
            >
                <div className="content">
                    <div className="title">Add weight</div>
                    <div className="description">
                        Click weight to change the value. Tracking weight helps Juicify manage your calories better, which will make your goal achievable faster.
                    </div>
                    <TimelineComponent />
                    <div className={styles.addProductsCloseButtonPlaceholder} />
                    <div className={styles.addProductsCloseButton} onClick={closeDialog}>
                        <Button variant="contained">
                            {t('Close')}
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default AddWeight;