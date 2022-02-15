import Macronutrients from "../components/pages/macronutrients";
import useMacronutrients from "../components/pages/macronutrients/useMacronutrients";

const MacronutrientsPage = () => {
    const props = useMacronutrients()

    return <Macronutrients {...props} />
}

export default MacronutrientsPage;