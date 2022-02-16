import BaseMacronutrients from "./Macronutrients";
import useMacronutrients from "./useMacronutrients";

const Macronutrients = () => {
    const props = useMacronutrients()

    return <BaseMacronutrients {...props} />
}

export default Macronutrients;