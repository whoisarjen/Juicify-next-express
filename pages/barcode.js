import { expectLoggedIN } from "../utils/checkAuth";

const Barcode = () => {
  expectLoggedIN();

  return <div className="barcode">Barcode</div>;
};

export default Barcode;
