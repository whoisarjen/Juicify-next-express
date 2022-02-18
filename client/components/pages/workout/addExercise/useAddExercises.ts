import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AddExercisesProps } from ".";
import useFind from "../../../../hooks/useFind";
import { useAppSelector } from "../../../../hooks/useRedux";
import { ExerciseSchemaProps } from "../../../../schema/exercise.schema";
import { deleteIndexedDB, getAllIndexedDB } from "../../../../utils/indexedDB.utils";

const useAddExercises = ({ skipThoseIDS, addThoseExercises }: AddExercisesProps) => {
    const { t } = useTranslation('home');
    const [tab, setTab] = useState(0)
    const [find, setFind] = useState<string | null>(null)
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState([])
    const [refreshChecked, setRefreshChecked] = useState(0)
    const [isCreateExercise, setIsCreateExercise] = useState(false)
    const { items, loading, searchCache } = useFind(find, 'exercise', tab, skipThoseIDS)
    const token: any = useAppSelector(state => state.token.value)
    const router: any = useRouter()

    const addExercisesToWorkoutPlan = async () => {
        checked.forEach(async (x: ExerciseSchemaProps) => {
            if (x._id) await deleteIndexedDB('checked_exercise', x._id)
        })
        addThoseExercises(checked)
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

    return { open, setOpen, find, setFind, loading, searchCache, items, checked, t, created, isCreateExercise, setTab, setRefreshChecked, setIsCreateExercise, refreshChecked, addExercisesToWorkoutPlan, router, token }
}

export type useAddExercisesProps = ReturnType<typeof useAddExercises>

export default useAddExercises;