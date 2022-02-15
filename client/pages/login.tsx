import Login from "../components/pages/login";
import useLogin from "../components/pages/login/useLogin";

const LoginPage = () => {
    const props = useLogin()

    return <Login {...props} />
};

export default LoginPage;
