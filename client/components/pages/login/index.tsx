import BaseLogin from "./Login";
import useLogin from "./useLogin";

const Login = () => {
    const props = useLogin()

    return <BaseLogin {...props} />
};

export default Login;
