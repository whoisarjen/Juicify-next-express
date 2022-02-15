import useRegister from "../components/register/useRegister";
import Register from "../components/register";

const RegisterPage = () => {
    const props = useRegister()

    return <Register {...props} />
};

export default RegisterPage;
