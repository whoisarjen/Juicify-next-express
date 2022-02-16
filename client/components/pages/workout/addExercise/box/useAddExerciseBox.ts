import { useState, useEffect } from "react"
import { AddExercisesBoxProps } from "."
import { useTheme } from "../../../../../hooks/useTheme"
import { deleteIndexedDB, addIndexedDB, getIndexedDBbyID } from "../../../../../utils/indexedDB.utils"

const useAddExercisesBox = ({ exercise, refreshCheckedExercises }: AddExercisesBoxProps) => {
    const [checked, setChecked] = useState(false)
    // const [fav, setFav] = useState(false)
    const { getTheme } = useTheme()

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


    return { exercise, checked, handleCheck, getTheme }
}

export type useAddExercisesBoxProps = ReturnType<typeof useAddExercisesBox>

export default useAddExercisesBox;