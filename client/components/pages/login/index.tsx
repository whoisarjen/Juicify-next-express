import Login from "./login";
import useLogin from "./useLogin";

const LoginComponents = () => {
    const props = useLogin()

    return <Login {...props} />
};

export default LoginComponents;
