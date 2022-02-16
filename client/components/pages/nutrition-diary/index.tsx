import NutritionDiary from "./nutritionDiary";
import useNutritionDiary from "./useNutritionDiary";

const NutritionDiaryComponent = () => {
    const props = useNutritionDiary()

    return <NutritionDiary {...props} />
};

export default NutritionDiaryComponent;