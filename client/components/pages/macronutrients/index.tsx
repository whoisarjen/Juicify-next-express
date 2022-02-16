import Macronutrients from "./macronutrients";
import useMacronutrients from "./useMacronutrients";

const MacronutrientsComponent = () => {
    const props = useMacronutrients()

    return <Macronutrients {...props} />
}

export default MacronutrientsComponent;