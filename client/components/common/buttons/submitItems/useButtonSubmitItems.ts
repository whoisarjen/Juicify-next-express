import useTranslation from "next-translate/useTranslation";
import { ButtonSubmitItemsProps } from ".";

const useButtonSubmitItems = ({ clicked, showNumberValue }: ButtonSubmitItemsProps) => {
    const { t } = useTranslation('home')

    return { clicked, showNumberValue, t }
}

export type useButtonSubmitItemsProps = ReturnType<typeof useButtonSubmitItems>

export default useButtonSubmitItems;