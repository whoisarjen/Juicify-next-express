import { FunctionComponent } from "react";
import { expectLoggedIN } from "../utils/checkAuth";

const Barcode: FunctionComponent = () => {
  expectLoggedIN();

  return <div className="barcode">Barcode</div>;
};

export default Barcode;
