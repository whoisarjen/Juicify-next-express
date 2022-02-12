import Checkbox from '@mui/material/Checkbox';
// import Favorite from '@mui/icons-material/Favorite';
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { FunctionComponent, useEffect, useState } from 'react'
import { addIndexedDB, deleteIndexedDB, getIndexedDBbyID } from '../../utils/indexedDB.utils';
import { useTheme } from '../../hooks/useTheme';
import { ExerciseSchemaProps } from '../../schema/exercise.schema';
import styled from 'styled-components';

interface AddProductsBox {
    exercise: ExerciseSchemaProps,
    refreshCheckedExercises: () => void
}

const Box = styled.div`
    display: grid;
    grid-template-columns: 1fr 44px 44px;
    margin-bottom: 10px;
    border: 1px solid #e4e4e4;
    border-left: 5px solid #e4e4e4;
    border-radius: 8px;
    padding: 10px 5px 10px 15px;
    width: calc(100% - 26px);
    font-size: 0.875rem;
    ${this} div {
        margin: auto;
    }
`

const Name = styled.div`
    margin-left: 0 !important;
    font-weight: bold;
`

const AddProductsBox: FunctionComponent<AddProductsBox> = ({ exercise, refreshCheckedExercises }) => {
    const [checked, setChecked] = useState(false)
    // const [fav, setFav] = useState(false)
    const [getTheme]: any = useTheme()

    {/* Need new way to handle synchronization with favourite exercise so for now OFF */ }
    // const handleLike = async () => {
    //     if (fav) {
    //         setFav(false)
    //         if (exercise._id) await deleteIndexedDB('favourite_exercise', exercise._id)
    //     } else {
    //         setFav(true)
    //         await addIndexedDB('favourite_exercise', [exercise])
    //     }
    // }

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
            // if (exercise._id) await getIndexedDBbyID('favourite_exercise', exercise._id) ? setFav(true) : setFav(false)
            if (exercise._id) await getIndexedDBbyID('checked_exercise', exercise._id) ? setChecked(true) : setChecked(false)
        })()
    }, [])

    return (
        <Box>
            <Name style={{ color: getTheme('PRIMARY') }}>
                {exercise.name}
            </Name>
            <div />
            {/* Need new way to handle synchronization with favourite exercise so for now OFF */}
            {/* <div className={styles.addExercisesBoxFavourite} onClick={handleLike}>
                <Checkbox checked={fav} icon={<FavoriteBorder fontSize="small" />} checkedIcon={<Favorite fontSize="small" />} />
            </div> */}
            <div onChange={handleCheck}>
                <Checkbox
                    checked={checked}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </div>
        </Box>
    );
}

export default AddProductsBox;