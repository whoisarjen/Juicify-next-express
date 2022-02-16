import SimpleSlider from "./simpleSlider";
import useSimpleSlider from "./useSimpleSlider";

export interface SimpleSliderProps {
    title: string,
    macro: Array<any>,
    beginValue: number,
    changed: (arg0: number) => void,
    day: number
}

const SimpleSliderComponents = ({ title, macro, beginValue, changed, day }: SimpleSliderProps) => {
    const props = useSimpleSlider({ title, macro, beginValue, changed, day })

    return <SimpleSlider {...props} />
}

export default SimpleSliderComponents;