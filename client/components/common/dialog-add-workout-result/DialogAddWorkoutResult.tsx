import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DatePickerMobile from '../date-picker-mobile'
import { getShortDate } from '../../../utils/date.utils'
import { WorkoutPlanSchemaProps } from '../../../schema/workoutPlan.schema'
import { useDialogAddWorkoutResultprops } from './useDialogAddWorkoutResult'

const BaseDialogAddWorkoutResult = ({ children, open, setOpen, data, setWhenAdded, workoutPlanID, setWorkoutPlanID, DialogAddWorkoutResult, t, theOldestSupportedDate }: useDialogAddWorkoutResultprops) => {

    if (!data || data.length == 0) {
        return <></>
    }

    return (
        <div>
            <div onClick={() => setOpen(true)}>{children}</div>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{t('CREATE_RESULT')}</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ marginBottom: '12px' }}>{t('CREATE_RESULT_DESCRIPTION')}</DialogContentText>
                    <DatePickerMobile change={(value) => setWhenAdded(value)} defaultDate={new Date(getShortDate())} minDate={new Date(theOldestSupportedDate())} />
                    <FormControl fullWidth sx={{ marginTop: '12px' }}>
                        <InputLabel id="demo-simple-select-label">{t('Workout plan')}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={workoutPlanID}
                            label={t('WORKOUT_PLAN')}
                            onChange={(event) => setWorkoutPlanID(event.target.value)}
                        >
                            {
                                data?.map((plan: WorkoutPlanSchemaProps) =>
                                    <MenuItem value={plan._id} key={plan._id}>{plan.title}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>{t('Cancel')}</Button>
                    <Button onClick={DialogAddWorkoutResult}>{t('Submit')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default BaseDialogAddWorkoutResult;