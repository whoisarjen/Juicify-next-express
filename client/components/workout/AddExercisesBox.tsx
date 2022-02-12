import styles from '../../styles/workout.module.css'
import Checkbox from '@mui/material/Checkbox';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { FunctionComponent, useEffect, useState } from 'react'
import { addIndexedDB, deleteIndexedDB, getIndexedDBbyID } from '../../utils/indexedDB.utils';
import { useTheme } from '../../hooks/useTheme';
import { ExerciseSchemaProps } from '../../schema/exercise.schema';

interface AddProductsBox {
    exercise: ExerciseSchemaProps,
    refreshCheckedExercises: () => void
}

const AddProductsBox: FunctionComponent<AddProductsBox> = ({ exercise, refreshCheckedExercises }) => {
    const [checked, setChecked] = useState(false)
    const [fav, setFav] = useState(false)
    const [getTheme]: any = useTheme()

    const handleLike = async () => {
        if (fav) {
            setFav(false)
            if (exercise._id) await deleteIndexedDB('favourite_exercise', exercise._id)
        } else {
            setFav(true)
            await addIndexedDB('favourite_exercise', [exercise])
        }
    }

    const handleCheck = async () => {
        if (checked) {
            setChecked(false)
            if (exercise._id) await deleteIndexedDB('checked_exercise', exercise._id)
        } else {
            setChecked(true)
            await addIndexedDB('checked_exercise', [exercise])
        }
        refreshCheckedExercises()
    }

    useEffect(() => {
        (async () => {
            if (exercise._id) await getIndexedDBbyID('favourite_exercise', exercise._id) ? setFav(true) : setFav(false)
            if (exercise._id) await getIndexedDBbyID('checked_exercise', exercise._id) ? setChecked(true) : setChecked(false)
        })()
    }, [])

    return (
        <div className={styles.addExercisesBox}>
            <div className={styles.addExercisesBoxName} style={{ color: getTheme('PRIMARY') }}>
                {exercise.name}
            </div>
            <div />
            {/* Need new way to handle synchronization with favourite exercise so for now OFF */}
            {/* <div className={styles.addExercisesBoxFavourite} onClick={handleLike}>
                <Checkbox checked={fav} icon={<FavoriteBorder fontSize="small" />} checkedIcon={<Favorite fontSize="small" />} />
            </div> */}
            <div className={styles.addExercisesBoxSubmit} onChange={handleCheck}>
                <Checkbox
                    checked={checked}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </div>
        </div>
    );
}

export default AddProductsBox;