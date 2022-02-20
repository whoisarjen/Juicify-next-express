import BaseProfileNavbar from "./ProfileNavbar";
import useNavbar from "./useProfileNavbar";

export interface ProfileNavbarProps {
    user: any,
    tab: number
}

const ProfileNavbar = ({ user, tab }: ProfileNavbarProps) => {
    const props = useNavbar({ user, tab })

    return <BaseProfileNavbar {...props} />
}

export default ProfileNavbar;