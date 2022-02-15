import ResetPassword from "../../components/pages/reset-password";
import useResetPassword from "../../components/pages/reset-password/useResetPassword";

const ResetPasswordPage = () => {
    const props = useResetPassword()

    return <ResetPassword {...props} />
};

export default ResetPasswordPage;
