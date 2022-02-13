import { forwardRef, useState, useEffect, Fragment, ReactElement, Ref } from 'react'
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import AddExercisesBox from './AddExercisesBox';
import useFind from '../../hooks/useFind';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BottomFlyingButton from '../common/BottomFlyingButton'
import useTranslation from "next-translate/useTranslation";
import { deleteIndexedDB, getAllIndexedDB } from '../../utils/indexedDB.utils';
import CreateExercise from './CreateExercise';
import { TransitionProps } from '@material-ui/core/transitions';
import { ExerciseSchemaProps } from '../../schema/exercise.schema';
import styled from 'styled-components'

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface AddDialogProps {
    isAddDialog: boolean,
    closeDialog: () => void,
    skipThoseIDS: Array<ExerciseSchemaProps>,
    addThoseExercises: (Arg0: Array<ExerciseSchemaProps>) => void
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

const AddDialog = ({ isAddDialog, closeDialog, skipThoseIDS, addThoseExercises }: AddDialogProps) => {
    const { t } = useTranslation('home');
    const [tab, setTab] = useState(0)
    const [find, setFind] = useState<string | null>(null)
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState([])
    const [refreshChecked, setRefreshChecked] = useState(0)
    const [loadingButton, setLoadingButton] = useState(false)
    const [isCreateExercise, setIsCreateExercise] = useState(false)
    const { items, loading, searchCache } = useFind(find, 'exercise', tab, skipThoseIDS)

    const addExercisesToWorkoutPlan = async () => {
        setLoadingButton(true)
        checked.forEach(async (x: ExerciseSchemaProps) => {
            if (x._id) await deleteIndexedDB('checked_exercise', x._id)
        })
        addThoseExercises(checked)
        setLoadingButton(false)
        closeDialog()
        setFind(null)
        setChecked([])
    }

    const created = async (exerciseName: string) => {
        if (exerciseName == find) {
            setFind(null)
        } else {
            setFind(exerciseName)
        }
        setIsCreateExercise(false)
    }

    useEffect(() => setOpen(false), [searchCache])
    useEffect(() => {
        (async () => {
            setChecked(await getAllIndexedDB('checked_exercise') || [])
        })()
    }, [refreshChecked])

    return (
        <Dialog
            fullScreen
            scroll='body'
            open={isAddDialog}
            TransitionComponent={Transition}
        >
            <div className="contentWithoutHeight">
                <div className="title">{t('Add exercises')}</div>
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
                    items &&
                    items.map((item: ExerciseSchemaProps) =>
                        <AddExercisesBox refreshCheckedExercises={() => setRefreshChecked(refreshChecked + 1)} exercise={item} key={item._id} />
                    )
                }
                <div className='contentGridPureWidth'>
                    <Button variant="outlined" onClick={() => setIsCreateExercise(true)} sx={{ margin: 'auto' }}>
                        {t('Create exercise')}
                    </Button>
                </div>
                <CreateExercise
                    created={created}
                    isCreateExercise={isCreateExercise}
                    closeCreateExercise={() => setIsCreateExercise(false)}
                />
                {
                    checked && checked.length > 0 &&
                    <BottomFlyingButton clicked={addExercisesToWorkoutPlan} isLoading={loadingButton} showNumberValue={checked.length} />
                }
                <Placeholder />
                <Close onClick={() => closeDialog()}>
                    <Button variant="contained">
                        {t('Close')}
                    </Button>
                </Close>
            </div>
        </Dialog>
    );
}

export default AddDialog;