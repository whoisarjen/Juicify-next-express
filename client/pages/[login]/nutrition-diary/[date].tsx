import NutritionDiary from "../../../components/pages/nutrition-diary";
import useNutritionDiary from "../../../components/pages/nutrition-diary/useNutritionDiary";

const NutritionDiaryPage = () => {
    const props = useNutritionDiary()

    return <NutritionDiary {...props} />
};

export default NutritionDiaryPage;
