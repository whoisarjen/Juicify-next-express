import useRegister from "../components/pages/register/useRegister";
import Register from "../components/pages/register";

const RegisterPage = () => {
    const props = useRegister()

    return <Register {...props} />
};

export default RegisterPage;
