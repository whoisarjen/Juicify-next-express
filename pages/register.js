import { expectLoggedOUT } from "../hooks/useAuth";

const Register = () => {
    expectLoggedOUT
    return (
        <div className="register">
            Register
        </div>
    );
}
 
export default Register;