import Macronutrients from "../components/macronutrients";
import useMacronutrients from "../components/macronutrients/useMacronutrients";

const MacronutrientsPage = () => {
    const props = useMacronutrients()

    return <Macronutrients {...props} />
}

export default MacronutrientsPage;