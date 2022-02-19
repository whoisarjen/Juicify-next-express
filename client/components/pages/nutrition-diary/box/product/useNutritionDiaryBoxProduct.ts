import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { NutritionDiaryBoxProductProps } from ".";
import { useAppSelector } from "../../../../../hooks/useRedux";

const useNutritionDiaryBoxProduct = ({ product, dailyMeasurement }: NutritionDiaryBoxProductProps) => {
    const { t } = useTranslation('nutrition-diary')
    const router: any = useRouter()
    const token: any = useAppSelector(state => state.token.value)

    return { product, dailyMeasurement, token, router, t }
}

export type useNutritionDiaryBoxProductProps = ReturnType<typeof useNutritionDiaryBoxProduct>

export default useNutritionDiaryBoxProduct;