import useTranslation from "next-translate/useTranslation";
import { ButtonOnlyWithNumberProps } from ".";

const useButtonOnlyWithNumber = ({ clicked, text, showNumber }: ButtonOnlyWithNumberProps) => {
    const { t } = useTranslation('home')

    return { clicked, text, showNumber, t }
}

export type useButtonOnlyWithNumberProps = ReturnType<typeof useButtonOnlyWithNumber>

export default useButtonOnlyWithNumber;