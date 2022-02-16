import BaseNavbar from "./Navbar";
import useNavbar from "./useNavbar";

export interface NavbarProps {
    user: any,
    tab: number
}

const Navbar = ({ user, tab }: NavbarProps) => {
    const props = useNavbar({ user, tab })

    return <BaseNavbar {...props} />
}

export default Navbar;