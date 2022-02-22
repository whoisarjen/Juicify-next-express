import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { DialogShowProductInformationsProps } from ".";

const useDialogShowProductInformations = ({ loadedProduct, handleClose, dailyMeasurement }: DialogShowProductInformationsProps) => {
    const { t } = useTranslation('nutrition-diary');

    return { loadedProduct, handleClose, dailyMeasurement, t }
}

export type useDialogShowProductInformationsProps = ReturnType<typeof useDialogShowProductInformations>

export default useDialogShowProductInformations;