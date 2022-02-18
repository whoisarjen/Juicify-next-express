import useTranslation from "next-translate/useTranslation";
import { useState, useEffect } from "react";
import { AddExercisesProps } from ".";
import useFind from "../../../../hooks/useFind";
import { ExerciseSchemaProps } from "../../../../schema/exercise.schema";
import { deleteIndexedDB, getAllIndexedDB } from "../../../../utils/indexedDB.utils";

const useAddExercises = ({ children, skipThoseIDS, addThoseExercises }: AddExercisesProps) => {
    const { t } = useTranslation('home');
    const [tab, setTab] = useState(0)
    const [find, setFind] = useState<string | null>(null)
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState([])
    const [refreshChecked, setRefreshChecked] = useState(0)
    const { items, loading, searchCache } = useFind(find, 'exercise', tab, skipThoseIDS)

    const addExercisesToWorkoutPlan = async () => {
        checked.forEach(async (x: ExerciseSchemaProps) => {
            if (x._id) await deleteIndexedDB('checked_exercise', x._id)
        })
        addThoseExercises(checked)
        setFind(null)
        setChecked([])
    }

    const changeFindToCreatedExerciseName = async (nameOfCreatedExercise: string) => {
        if (nameOfCreatedExercise == find) {
            setFind(null)
        } else {
            setFind(nameOfCreatedExercise)
        }
    }

    useEffect(() => setOpen(false), [searchCache])

    useEffect(() => {
        (async () => {
            setChecked(await getAllIndexedDB('checked_exercise') || [])
        })()
    }, [refreshChecked])

    return { children, open, setOpen, find, setFind, loading, searchCache, items, checked, t, changeFindToCreatedExerciseName, setTab, setRefreshChecked, refreshChecked, addExercisesToWorkoutPlan }
}

export type useAddExercisesProps = ReturnType<typeof useAddExercises>

export default useAddExercises;