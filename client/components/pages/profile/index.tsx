import Profile from "./profile";
import useProfile from "./useProfile";

const ProfileComponent = () => {
    const props = useProfile()

    return <Profile {...props} />
};

export default ProfileComponent;