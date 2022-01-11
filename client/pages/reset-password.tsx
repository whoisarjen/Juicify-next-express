import { FunctionComponent } from "react";
import { expectLoggedOUT } from "../utils/checkAuth";

const ResetPassword: FunctionComponent = () => {
  expectLoggedOUT();
  return <div className="resetPassword">Reset password</div>;
};

export default ResetPassword;
