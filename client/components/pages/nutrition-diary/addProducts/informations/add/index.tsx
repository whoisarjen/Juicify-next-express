import InformationsAdd from "./informationsAdd";
import useInformationsAdd from "./useInformationsAdd";

export interface DiagramsOptionsProps {
    isAdd: boolean,
    setIsAdd: (arg0: boolean) => void,
    dailyMeasurement: any,
    defaultMeal?: number,
    loadedProduct: any
}

const DiagramsOptions = ({ isAdd, setIsAdd, dailyMeasurement, defaultMeal = 0, loadedProduct }: DiagramsOptionsProps) => {
    const props = useInformationsAdd({ isAdd, setIsAdd, dailyMeasurement, defaultMeal, loadedProduct })

    return <InformationsAdd {...props} />
}

export default DiagramsOptions;