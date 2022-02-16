import Navbar from "./navbar";
import useNavbar from "./useNavbar";

export interface NavbarProps {
    user: any,
    tab: number
}

const NavbarComponent = ({ user, tab }: NavbarProps) => {
    const props = useNavbar({ user, tab })

    return <Navbar {...props} />
}

export default NavbarComponent;