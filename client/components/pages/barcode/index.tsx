import BaseBarcode from "./Barcode";
import useBarcode from "./useBarcode";

const Barcode = () => {
    const props = useBarcode()
    return <BaseBarcode {...props} />
}

export default Barcode;