import BaseNutritionDiary from "./NutritionDiary";
import useNutritionDiary from "./useNutritionDiary";

const NutritionDiary = () => {
    const props = useNutritionDiary()

    return <BaseNutritionDiary {...props} />
};

export default NutritionDiary;