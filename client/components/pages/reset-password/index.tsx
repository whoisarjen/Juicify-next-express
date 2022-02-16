import ResetPassword from "./resetPassword";
import useResetPassword from "./useResetPassword";

const ResetPasswordComponent = () => {
    const props = useResetPassword()

    return <ResetPassword {...props} />
};

export default ResetPasswordComponent;
