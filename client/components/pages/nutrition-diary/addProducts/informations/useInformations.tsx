import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { InformationsProps } from ".";

const useInformations = ({ loadedProduct, handleClose, dailyMeasurement }: InformationsProps) => {
    const { t } = useTranslation('nutrition-diary');
    const [isAdd, setIsAdd] = useState(false)

    return { loadedProduct, handleClose, dailyMeasurement, t, isAdd, setIsAdd }
}

export type useInformationsProps = ReturnType<typeof useInformations>

export default useInformations;