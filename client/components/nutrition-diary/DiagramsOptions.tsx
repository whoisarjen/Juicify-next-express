import { forwardRef, FunctionComponent, useState } from "react";
import Button from '@mui/material/Button';
import PieChartIcon from '@mui/icons-material/PieChart';
import styles from '../../styles/nutrition-diary.module.css'
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { insertThoseIDStoDB, is_id, overwriteThoseIDSinDB } from "../../utils/db.utils";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface DiagramsOptionsProps {
    data: any,
    reloadDailyMeasurement: () => void
}

const DiagramsOptions: FunctionComponent<DiagramsOptionsProps> = ({ data, reloadDailyMeasurement }) => {
    const router: any = useRouter()
    const { t } = useTranslation('nutrition-diary')
    const [activity, setActivity] = useState('')
    const [burnt, setBurnt] = useState(0)
    const [isAddActivity, setIsAddActivity] = useState(false)

    const addNewActivity = async () => {
        if (activity || burnt) {
            let calories = -burnt
            let object: any = { ...data }
            object.nutrition_diary.push({
                _id: 'XD' + new Date().getTime(),
                ...(activity && { activity }),
                ...(calories && { calories })
            })
            if (await is_id(data._id)) {
                await overwriteThoseIDSinDB('daily_measurement', [object])
            } else {
                await insertThoseIDStoDB('daily_measurement', [object])
            }
            reloadDailyMeasurement()
        }
        setBurnt(0)
        setActivity('')
        setIsAddActivity(false)
    }

    return (
        <div className={styles.diagramsOptions}>
            <div className={styles.diagramsOptionsExtrButtons}>
                <div />
                <Button
                    onClick={() => router.push('/macronutrients')}
                    color="primary"
                    variant="outlined"
                    aria-label="macronutrients"
                    component="span"
                    startIcon={<PieChartIcon />}
                    sx={{ margin: 'auto' }}
                >
                    {t('Macronutrients')}
                </Button>
                <div />
                <Button
                    onClick={() => setIsAddActivity(true)}
                    color="error"
                    variant="outlined"
                    aria-label="Burnt calories"
                    component="span"
                    startIcon={<LocalFireDepartmentIcon />}
                    sx={{ margin: 'auto' }}
                >
                    {t('Burnt calories')}
                </Button>
                <div />
            </div>
            <Dialog
                open={isAddActivity}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setIsAddActivity(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{t('ADD_BURNT_CALORIES')}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {t('ADD_BURNT_CALORIES_DESCRIPTION')}
                    </DialogContentText>
                    <TextField
                        value={activity}
                        onChange={(e) => setActivity(e.target.value ? e.target.value : '')}
                        id="outlined-basic"
                        label={t('NAME_OF_ACTIVITY')}
                        variant="outlined"
                        fullWidth
                        sx={{ marginTop: '12px' }}
                    />
                    <TextField
                        value={burnt}
                        onChange={(e) => setBurnt(e.target.value ? parseInt(e.target.value) : 0)}
                        id="outlined-basic"
                        label={t('BURNT_CALORIES')}
                        variant="outlined"
                        fullWidth
                        sx={{ marginTop: '12px' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">-</InputAdornment>,
                            endAdornment: <InputAdornment position="end">kcal</InputAdornment>,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsAddActivity(false)}>{t('Deny')}</Button>
                    <Button onClick={addNewActivity}>{t('Confirm')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DiagramsOptions;