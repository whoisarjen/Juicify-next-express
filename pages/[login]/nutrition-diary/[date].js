import Link from "next/link";
import { useRouter } from "next/router";
import NutritionDiaryBox from "../../../components/pages/nutritionDiary/NutitionDiaryBox";

const NutritionDiary = () => {
  const router = useRouter()
  return (
    <div className="NutritionDiary">
      <Link passHref href={`/${router.query.login}/nutrition-diary/${new Date((new Date(router.query.date)).setDate((new Date(router.query.date)).getDate() + 1)).toJSON().slice(0, 10)}`}><a>Next</a></Link>
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
