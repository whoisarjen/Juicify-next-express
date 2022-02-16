import Register from "./register";
import useRegister from "./useRegister";


const RegisterComponent = () => {
    const props = useRegister()

    return <Register {...props} />
};

export default RegisterComponent;
