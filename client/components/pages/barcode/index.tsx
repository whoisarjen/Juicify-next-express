import Barcode from "./barcode";
import useBarcode from "./useBarcode";

const BarcodeComponent = () => {
    const props = useBarcode()
    return <Barcode {...props} />
}

export default BarcodeComponent;