import Link from "next/link";
import { useRouter } from "next/router";
import MealBox from "../../../components/nutrition-diary/MealBox";
import AddProducts from '../../../components/nutrition-diary/AddProducts'
import { useState } from 'react'

const NutritionDiary = () => {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openDialog = (i) => {
    setIndex(i)
    setIsDialogOpen(true)
  }

  return (
    <div className="NutritionDiary">
      <Link passHref href={`/${router.query.login}/nutrition-diary/${new Date((new Date(router.query.date)).setDate((new Date(router.query.date)).getDate() + 1)).toJSON().slice(0, 10)}`}><a>Next</a></Link>
      {[...Array(5)].map((x, i) => (
        <MealBox
          index={i}
          openDialog={() => openDialog(i)}
          products={[{ name: "123" }, { name: "234" }, { name: "345" }]}
          key={i}
        />
      ))}
      <AddProducts meal={index} isDialogOpen={isDialogOpen} closeDialog={() => setIsDialogOpen(false)}/>
    </div>
  );
};

export default NutritionDiary;
