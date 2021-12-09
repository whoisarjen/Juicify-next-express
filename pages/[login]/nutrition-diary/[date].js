import NutritionDiaryBox from "../../../components/nutritionDiary/NutitionDiaryBox";

const NutritionDiary = () => {
  return (
    <div className="NutritionDiary">
      {[...Array(5)].map((x, i) => (
        <NutritionDiaryBox
          index={i}
          products={[{ name: "123" }, { name: "123" }, { name: "123" }]}
          key={i}
        />
      ))}
    </div>
  );
};

export default NutritionDiary;
