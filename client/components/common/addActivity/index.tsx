import { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SlideUp from "../../transition/SlideUp";
import { zodResolver } from "@hookform/resolvers/zod";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";
import { ActivitySchemaProps, ActivitySchema } from "../../../schema/activity.schema";
import { insertThoseIDStoDBController } from "../../../utils/db.utils";
import { useAppDispatch } from "../../../hooks/useRedux";
import { refreshKey } from "../../../redux/features/key.slice";

const AddActivity = ({ children, data }: any) => {
    const { t } = useTranslation('nutrition-diary')
    const [activity, setActivity] = useState('')
    const [burnt, setBurnt] = useState(0)
    const [isAddActivity, setIsAddActivity] = useState(false)
    const dispatch = useAppDispatch()

    const addNewActivity = async () => {
        if (activity || burnt) {
            let calories = -burnt
            let object: any = { ...data }
            object.nutrition_diary.push({
                _id: 'XD' + new Date().getTime(),
                ...(activity && { activity }),
                ...(calories && { calories })
            })
            await insertThoseIDStoDBController('daily_measurement', [object])
            dispatch(refreshKey('daily_measurement'))
        }
        setBurnt(0)
        setActivity('')
        setIsAddActivity(false)
    }

    const { register, formState: { errors }, handleSubmit } = useForm<ActivitySchemaProps>({
        resolver: zodResolver(ActivitySchema)
    })

    return (
        <>
            <div onClick={() => setIsAddActivity(true)}>{children}</div>
            <Dialog
                open={isAddActivity}
                TransitionComponent={SlideUp}
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
        </>
    )
}

export default AddActivity;