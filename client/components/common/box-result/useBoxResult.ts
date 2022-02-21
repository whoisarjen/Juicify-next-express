import { useState, useEffect } from "react"
import { BoxResultProps } from "."
import { ValueSchemaProps } from "../../../schema/workoutResult.schema"

const useBoxResult = ({ result, setNewValues, isOwner, deleteExerciseWithIndex }: BoxResultProps) => {
    const [values, setValues] = useState<Array<ValueSchemaProps>>(result.values)

    const changeResult = (object: ValueSchemaProps, index: number) => {
        let array = values
        array[index] = { ...object, open: false }
        setNewValues(array)
    }

    const deleteResult = (index: number) => {
        const array = values.filter((x, i) => i != index)
        setValues(array)
        setNewValues(array)
    }

    const openNewResult = () => {
        if (values?.length) {
            const previousValues = values.map((value: ValueSchemaProps) => {
                value.open = false;
                return value
            })
            setNewValues(
                [
                    ...previousValues,
                    {
                        reps: values[values.length - 1].reps,
                        weight: values[values.length - 1].weight,
                        open: true
                    }
                ]
            )
        } else {
            setNewValues(
                [
                    {
                        reps: 0,
                        weight: 0,
                        open: true
                    }
                ]
            )
        }
    }

    useEffect(() => setValues(result.values), [result])

    return { result, isOwner, deleteExerciseWithIndex, deleteResult, changeResult, openNewResult, values }
}

export type useBoxResultProps = ReturnType<typeof useBoxResult>

export default useBoxResult;