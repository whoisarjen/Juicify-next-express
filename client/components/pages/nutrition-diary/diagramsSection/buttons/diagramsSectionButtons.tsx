import { forwardRef } from "react";
import Button from '@mui/material/Button';
import PieChartIcon from '@mui/icons-material/PieChart';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import styled from "styled-components";
import SlideUp from "../../../../transition/SlideUp";
import { useDiagramsSectionButtonsProps } from "./useDiagramsSectionButtons";

const Box = styled.div`
    display: grid;
    margin-bottom: 24px;
`

const Buttons = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 1fr;
`

const DiagramsSectionButtons = ({ router, isAddActivity, setIsAddActivity, activity, setActivity, burnt, setBurnt, addNewActivity, t }: useDiagramsSectionButtonsProps) => {
    return (
        <Box>
            <Buttons>
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
            </Buttons>
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
        </Box>
    )
}

export default DiagramsSectionButtons;