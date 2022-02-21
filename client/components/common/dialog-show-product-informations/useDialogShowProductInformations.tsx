import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { DialogShowProductInformationsProps } from ".";

const useDialogShowProductInformations = ({ loadedProduct, handleClose, dailyMeasurement }: DialogShowProductInformationsProps) => {
    const { t } = useTranslation('nutrition-diary');
    const [isAdd, setIsAdd] = useState(false)

    return { loadedProduct, handleClose, dailyMeasurement, t, isAdd, setIsAdd }
}

export type useDialogShowProductInformationsProps = ReturnType<typeof useDialogShowProductInformations>

export default useDialogShowProductInformations;