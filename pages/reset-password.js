import { expectLoggedOUT } from "../utils/checkAuth";

const ResetPassword = () => {
  expectLoggedOUT();
  return <div className="resetPassword">Reset password</div>;
};

export default ResetPassword;
