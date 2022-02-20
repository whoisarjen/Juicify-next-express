import useTranslation from "next-translate/useTranslation";
import { ButtonSubmitItemsProps } from ".";

const useButtonSubmitItems = ({ clicked, text, showNumber }: ButtonSubmitItemsProps) => {
    const { t } = useTranslation('home')

    return { clicked, text, showNumber, t }
}

export type useButtonSubmitItemsProps = ReturnType<typeof useButtonSubmitItems>

export default useButtonSubmitItems;