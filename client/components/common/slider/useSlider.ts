import useTranslation from "next-translate/useTranslation";
import { useState, useEffect } from "react";
import { SliderProps } from ".";

const useSlider = ({ title, macro, beginValue, changed, day }: SliderProps) => {
    const [value, setValue] = useState<any>(false);
    const [timer, setTimer] = useState<any>(null)
    const [maxValue, setMaxValue] = useState(0)
    const { t } = useTranslation('macronutrients')

    useEffect(() => setValue(beginValue), [beginValue, day])

    useEffect(() => {
        const key = title.toLowerCase()
        let count = 0
        macro.forEach(x => {
            if (!x.locked || x.day == day) {
                count += x[key]
            }
        })
        setMaxValue(count)
        if (value > count) {
            setValue(count)
        }
    }, [macro, day])

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setValue(newValue);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > maxValue) {
            setValue(maxValue);
        }
    };

    useEffect(() => {
        clearTimeout(timer)
        if (value !== false && value !== beginValue) {
            const changeFunction = (find: string) => setTimeout(async () => {
                changed(value)
            }, 500)
            setTimer(changeFunction(value))
        }
    }, [value])

    return { title, macro, beginValue, changed, day, value, maxValue, handleChange, handleInputChange, handleBlur, t }
}

export type useSliderProps = ReturnType<typeof useSlider>

export default useSlider;