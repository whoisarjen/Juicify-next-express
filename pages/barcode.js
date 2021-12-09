import { expectLoggedIN } from "../hooks/useAuth";

const Barcode = () => {
  expectLoggedIN();

  return <div className="barcode">Barcode</div>;
};

export default Barcode;
