import BaseResetPassword from "./ResetPassword";
import useResetPassword from "./useResetPassword";

const ResetPassword = () => {
    const props = useResetPassword()

    return <BaseResetPassword {...props} />
};

export default ResetPassword;
