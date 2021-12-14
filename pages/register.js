import { expectLoggedOUT } from "../utils/checkAuth";

const Register = () => {
  expectLoggedOUT;
  return <div className="register">Register</div>;
};

export default Register;
