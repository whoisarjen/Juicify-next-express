import { FunctionComponent } from "react";
import { expectLoggedOUT } from "../utils/checkAuth";

const Register: FunctionComponent = () => {
  expectLoggedOUT;
  return <div className="register">Register</div>;
};

export default Register;
