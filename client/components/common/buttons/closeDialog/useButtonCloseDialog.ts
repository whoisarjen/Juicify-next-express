import useTranslation from "next-translate/useTranslation";
import { ButtonCloseDialogProps } from ".";

const useButtonCloseDialog = ({ clicked }: ButtonCloseDialogProps) => {
    const { t } = useTranslation('home')

    return { clicked, t }
}

export type useButtonCloseDialogProps = ReturnType<typeof useButtonCloseDialog>

export default useButtonCloseDialog;