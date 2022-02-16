import Informations from "./informations";
import useInformations from "./useInformations";

export interface InformationsProps {
    loadedProduct: any,
    handleClose: () => void,
    dailyMeasurement: any
}

const InformationsComponent = ({ loadedProduct, handleClose, dailyMeasurement }: InformationsProps) => {
    const props = useInformations({ loadedProduct, handleClose, dailyMeasurement })

    return <Informations {...props} />
}

export default InformationsComponent;