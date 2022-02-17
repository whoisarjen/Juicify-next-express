import { Fragment } from 'react'
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BottomFlyingButton from '../../../common/BottomFlyingButton'
import { ExerciseSchemaProps } from '../../../../schema/exercise.schema';
import styled from 'styled-components'
import CreateExercise from './createExercise';
import SlideUp from '../../../transition/SlideUp';
import { useAddExercisesProps } from './useAddExercises';
import AddExercisesBox from './box';

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

const GridFullWidth = styled.div`
    display: grid;
    width: 100%;
`

const Title = styled.div`
    font-size: 2rem;
    margin-bottom: 10px;
    font-weight: bold;
`

const BaseAddExercises = ({ isAddDialog, closeDialog, open, setOpen, find, setFind, loading, searchCache, items, checked, t, created, isCreateExercise, tab, setTab, setRefreshChecked, setIsCreateExercise, refreshChecked, loadingButton, addExercisesToWorkoutPlan }: useAddExercisesProps) => {
    return (
        <Dialog
            fullScreen
            scroll='body'
            open={isAddDialog}
            TransitionComponent={SlideUp}
        >
            <Grid>
                <Title>{t('Add exercises')}</Title>
                <Autocomplete
                    sx={{ marginBottom: '10px' }}
                    open={open}
                    value={find}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    isOptionEqualToValue={(option, value) => option === value}
                    getOptionLabel={option => option ? option : ''}
                    options={searchCache}
                    loading={loading}
                    onInputChange={(e, value) => setFind(value.trim().toLowerCase())}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={t('Search')}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </Fragment>
                                ),
                            }}
                        />
                    )}
                />
                <Tabs
                    value={tab}
                    onChange={(e, value) => setTab(value)}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="fullWidth"
                    sx={{ marginBottom: '10px' }}
                >
                    <Tab wrapped label={t('All')} />
                    <Tab wrapped label={t('Favourite')} />
                    <Tab wrapped label={`${t('Selected')} (${checked.length})`} />
                </Tabs>
                {
                    items?.length > 0 &&
                    items.map((item: ExerciseSchemaProps) =>
                        <AddExercisesBox refreshCheckedExercises={() => setRefreshChecked(refreshChecked + 1)} exercise={item} key={item._id} />
                    )
                }
                <GridFullWidth>
                    <Button variant="outlined" onClick={() => setIsCreateExercise(true)} sx={{ margin: 'auto' }}>
                        {t('Create exercise')}
                    </Button>
                </GridFullWidth>
                <CreateExercise
                    created={created}
                    isCreateExercise={isCreateExercise}
                    closeCreateExercise={() => setIsCreateExercise(false)}
                />
                {
                    checked?.length > 0 &&
                    <BottomFlyingButton clicked={addExercisesToWorkoutPlan} isLoading={loadingButton} showNumberValue={checked.length} />
                }
                <Placeholder />
                <Close onClick={() => closeDialog()}>
                    <Button variant="contained">
                        {t('Close')}
                    </Button>
                </Close>
            </Grid>
        </Dialog>
    );
}

export default BaseAddExercises;