import { forwardRef, useState, useEffect, Fragment } from 'react'
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide'
import Button from '@mui/material/Button';
import styles from '../../styles/nutrition-diary.module.css'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import AddDialogExercise from './AddExercisesBox';
import useFind from '../../hooks/useFind';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import LoadingButton from '@mui/lab/LoadingButton';
import useTranslation from "next-translate/useTranslation";
import { addIndexedDB, deleteIndexedDB, getAllIndexedDB, getIndexedDBbyID, putIndexedDB } from '../../utils/indexedDB';
import { useRouter } from 'next/router';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddDialog = ({ isAddDialog, closeDialog, skipThoseIDS, reload }) => {
    const { t } = useTranslation('home');
    const [tab, setTab] = useState(0)
    const [find, setFind] = useState(null)
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState([])
    const router = useRouter()
    const [refreshChecked, setRefreshChecked] = useState(0)
    const [loadingButton, setLoadingButton] = useState(false)
    const { items, loading, searchCache } = useFind(find, 'exercise', tab, skipThoseIDS)

    const addExercisesToWorkoutPlan = async () => {
        setLoadingButton(true)
        let workout = await getIndexedDBbyID('workout_plan', router.query.id)
        checked.forEach(async x => {
            await deleteIndexedDB('checked_exercise', x._id)
            workout.exercises.push({
                _id: x._id,
                name: x.name
            })
        })
        await deleteIndexedDB('workout_plan', router.query.id)
        await addIndexedDB('workout_plan', [workout])
        reload()
        setRefreshChecked()
        setLoadingButton(false)
        closeDialog()
        setFind(null)
    }

    useEffect(() => setOpen(false), [searchCache])
    useEffect(async () => setChecked(await getAllIndexedDB('checked_exercise') || []), [refreshChecked])

    return (
        <div className={styles.addProducts}>
            <Dialog
                fullScreen
                scroll='body'
                open={isAddDialog}
                TransitionComponent={Transition}
            >
                <div className="content">
                    <div className="title">{t('Add exercises')}</div>
                    <Autocomplete
                        sx={{ marginBottom: '10px' }}
                        open={open}
                        value={find}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        isOptionEqualToValue={(option, value) => option === value}
                        getOptionLabel={(option) => option}
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
                        items && items.map(item =>
                            <AddDialogExercise refreshCheckedExercises={() => setRefreshChecked(refreshChecked + 1)} exercise={item} key={item._id} />
                        )
                    }
                    {
                        checked && checked.length > 0 &&
                        <>
                            <div className={styles.addProductsSubmit}>
                                <LoadingButton
                                    onClick={addExercisesToWorkoutPlan}
                                    loading={loadingButton}
                                    variant="contained"
                                >
                                    {t('Submit')} ({checked.length})
                                </LoadingButton>
                            </div>
                            <div className={styles.addProductsSubmitPlaceholder} />
                        </>
                    }
                    <div className={styles.addProductsCloseButtonPlaceholder} />
                    <div className={styles.addProductsCloseButton} onClick={() => closeDialog()}>
                        <Button variant="contained">
                            {t('Close')}
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default AddDialog;