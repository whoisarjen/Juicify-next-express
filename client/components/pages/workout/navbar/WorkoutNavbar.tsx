import SaveIcon from '@mui/icons-material/Save'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import styled from 'styled-components'
import ConfirmDialog from "../../../common/ConfirmDialog";
import { useWorkoutNavbarProps } from "./useWorkoutNavbar";

const Grid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 44px 1fr 44px auto;
    margin: auto;
`

const Title = styled.div`
    font-size: 2rem;
    margin-bottom: 10px;
    font-weight: bold;
`

const BaseWorkoutNavbar = ({ title, where, isLoading, saveWorkout, deleteWorkout, router, token, isDialog, setIsDialog, t }: useWorkoutNavbarProps) => {
    return (
        <>
            <Title>{t(`${title}`)}</Title>
            <Grid>
                <IconButton aria-label="route" onClick={() => router.push(`/${router.query.login}/${where}`)} sx={{ margin: 'auto' }}>
                    <KeyboardBackspaceIcon />
                </IconButton>
                <div />
                {
                    token.login == router.query.login
                        ?
                        <>
                            <IconButton aria-label="delete" onClick={() => setIsDialog(true)} sx={{ margin: 'auto' }}>
                                <DeleteIcon />
                            </IconButton>
                            <LoadingButton
                                loading={isLoading}
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                variant="outlined"
                                onClick={saveWorkout}
                            >
                                {t('Save')}
                            </LoadingButton>
                            <ConfirmDialog
                                isDialog={isDialog}
                                confirm={deleteWorkout}
                                closeDialog={() => setIsDialog(false)}
                            />
                        </>
                        :
                        <>
                            <div />
                            <div />
                        </>
                }
            </Grid>
        </>
    );
}

export default BaseWorkoutNavbar;