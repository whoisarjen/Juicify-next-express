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
import { DailyMeasurementSchemaProps } from "../../../schema/dailyMeasurement.schema";

const DialogCreateActivity = ({ children, data }: { children: any, data: DailyMeasurementSchemaProps }) => {
    const { t } = useTranslation('nutrition-diary')
    const [isDialog, setIsDialog] = useState(false)

    const addNewActivity = async (values: ActivitySchemaProps) => {
        if (values.activity || values.calories) {
            let object: DailyMeasurementSchemaProps = { ...data }
            object.nutrition_diary.push({
                _id: 'XD' + new Date().getTime(),
                ...(values.activity && { activity: values.activity }),
                ...(values.calories && { calories: -values.calories })
            })
            await insertThoseIDStoDBController('daily_measurement', [object])
        }
        setIsDialog(false)
    }

    const { register, formState: { errors }, handleSubmit } = useForm<ActivitySchemaProps>({
        resolver: zodResolver(ActivitySchema)
    })

    return (
        <>
            <div onClick={() => setIsDialog(true)}>{children}</div>
            <Dialog
                open={isDialog}
                TransitionComponent={SlideUp}
                keepMounted
                onClose={() => setIsDialog(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{t('ADD_BURNT_CALORIES')}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {t('ADD_BURNT_CALORIES_DESCRIPTION')}
                    </DialogContentText>
                    <TextField
                        id="outlined-basic"
                        label={t('NAME_OF_ACTIVITY')}
                        variant="outlined"
                        fullWidth
                        sx={{ marginTop: '12px' }}
                        {...register('activity')}
                        error={typeof errors.activity === 'undefined' ? false : true}
                        helperText={
                            errors.activity?.message &&
                            errors.activity?.message.length &&
                            errors.activity?.message
                        }
                    />
                    <TextField
                        id="outlined-basic"
                        label={t('BURNT_CALORIES')}
                        variant="outlined"
                        fullWidth
                        sx={{ marginTop: '12px' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">-</InputAdornment>,
                            endAdornment: <InputAdornment position="end">kcal</InputAdornment>,
                        }}
                        {...register('calories')}
                        error={typeof errors.calories === 'undefined' ? false : true}
                        helperText={
                            errors.calories?.message &&
                            errors.calories?.message.length &&
                            errors.calories?.message
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialog(false)}>{t('Deny')}</Button>
                    <Button onClick={handleSubmit(addNewActivity)}>{t('Confirm')}</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogCreateActivity;