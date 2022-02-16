import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { AddProductsInformationsProps } from ".";

const useAddProductsinformations = ({ loadedProduct, handleClose, dailyMeasurement }: AddProductsInformationsProps) => {
    const { t } = useTranslation('nutrition-diary');
    const [isAdd, setIsAdd] = useState(false)

    return { loadedProduct, handleClose, dailyMeasurement, t, isAdd, setIsAdd }
}

export type useAddProductsinformationsProps = ReturnType<typeof useAddProductsinformations>

export default useAddProductsinformations;