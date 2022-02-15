import Barcode from "../components/barcode";
import useBarcode from "../components/barcode/useBarcode";

const BarcodePage = () => {
    const props = useBarcode()

    return <Barcode {...props} />
}

export default BarcodePage;