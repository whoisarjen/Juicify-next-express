import Barcode from "../components/pages/barcode";
import useBarcode from "../components/pages/barcode/useBarcode";

const BarcodePage = () => {
    const props = useBarcode()

    return <Barcode {...props} />
}

export default BarcodePage;