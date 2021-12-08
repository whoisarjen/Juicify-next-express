import { expectLoggedOUT } from "../hooks/useAuth";

const ResetPassword = () => {
    expectLoggedOUT()
    return (
        <div className="resetPassword">
            Reset password
        </div>
    );
}
 
export default ResetPassword;