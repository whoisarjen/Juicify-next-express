import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { BoxMealItemProps } from ".";
import { useAppSelector } from "../../../hooks/useRedux";

const useBoxMealItem = ({ product, dailyMeasurement }: BoxMealItemProps) => {
    const { t } = useTranslation('nutrition-diary')
    const router: any = useRouter()
    const token: any = useAppSelector(state => state.token.value)

    return { product, dailyMeasurement, token, router, t }
}

export type useBoxMealItemProps = ReturnType<typeof useBoxMealItem>

export default useBoxMealItem;