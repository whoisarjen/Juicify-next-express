import BaseRegister from "./Register";
import useRegister from "./useRegister";

const Register = () => {
    const props = useRegister()

    return <BaseRegister {...props} />
};

export default Register;
