import { useState, useEffect } from "react"
import { ValueBoxProps } from "."

const useValueBox = ({ value, index, changeResult, deleteResult, isOwner }: ValueBoxProps) => {
    const [reps, setReps] = useState(value.reps.toString())
    const [weight, setWeight] = useState(value.weight.toString())
    const [open, setOpen] = useState(value.open || false)
    const [repsOptions, setRepsOptions] = useState(['0'])
    const [weightOptions, setWeightOptions] = useState(['0'])

    const loadWeight = (choosenWeight: string) => {
        const choosenWeightLocally = parseFloat(choosenWeight)
        let weight = ['0']
        if (choosenWeightLocally) {
            if (choosenWeight != '0') {
                weight.push(choosenWeight)
            }
            for (let i = 1; i <= 4; i++) {
                weight.push((choosenWeightLocally + (i / 4)).toString())
            }
        } else {
            for (let i = 1; i <= 40; i++) {
                weight.push((i / 4).toString())
            }
        }
        setWeight(choosenWeight.toString())
        setWeightOptions(weight)
    }

    useEffect(() => {
        let reps = []
        for (let i = 0; i <= 100; i++) {
            reps.push(i.toString())
        }
        setRepsOptions(reps)
        loadWeight(value.weight.toString())
    }, [])

    return { index, changeResult, isOwner, open, setOpen, weight, reps, setReps, deleteResult, weightOptions, loadWeight, repsOptions }
}

export type useValueBoxProps = ReturnType<typeof useValueBox>

export default useValueBox;