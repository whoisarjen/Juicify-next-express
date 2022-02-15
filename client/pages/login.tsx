import Login from "../components/login";
import useLogin from "../components/login/useLogin";

const LoginPage = () => {
    const props = useLogin()

    return <Login {...props} />
};

export default LoginPage;
