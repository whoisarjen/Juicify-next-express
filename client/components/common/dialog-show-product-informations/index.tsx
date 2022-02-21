import BaseDialogShowProductInformations from "./DialogShowProductInformations";
import useInformations from "./useDialogShowProductInformations";

export interface DialogShowProductInformationsProps {
    loadedProduct: any,
    handleClose: () => void,
    dailyMeasurement: any
}

const DialogShowProductInformations = ({ loadedProduct, handleClose, dailyMeasurement }: DialogShowProductInformationsProps) => {
    const props = useInformations({ loadedProduct, handleClose, dailyMeasurement })

    return <BaseDialogShowProductInformations {...props} />
}

export default DialogShowProductInformations;