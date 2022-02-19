import BaseButtonCloseDialog from "./ButtonCloseDialog";
import useButtonCloseDialog from "./useButtonCloseDialog";

export interface ButtonCloseDialogProps {
    clicked: () => void
}

const ButtonCloseDialog = ({ clicked }: ButtonCloseDialogProps) => {
    const props = useButtonCloseDialog({ clicked })

    return <BaseButtonCloseDialog {...props} />
}

export default ButtonCloseDialog;