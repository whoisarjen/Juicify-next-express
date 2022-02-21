import BaseSlider from "./Slider";
import useSlider from "./useSlider";

export interface SliderProps {
    title: string,
    macro: Array<any>,
    beginValue: number,
    changed: (arg0: number) => void,
    day: number
}

const Slider = ({ title, macro, beginValue, changed, day }: SliderProps) => {
    const props = useSlider({ title, macro, beginValue, changed, day })

    return <BaseSlider {...props} />
}

export default Slider;