import BaseNavbarProfile from "./NavbarProfile";
import useNavbar from "./useNavbarProfile";

export interface NavbarProfileProps {
    user: any,
    tab: number
}

const NavbarProfile = ({ user, tab }: NavbarProfileProps) => {
    const props = useNavbar({ user, tab })

    return <BaseNavbarProfile {...props} />
}

export default NavbarProfile;