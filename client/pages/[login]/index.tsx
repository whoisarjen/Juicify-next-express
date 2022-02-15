import Profile from "../../components/pages/profile";
import useProfile from "../../components/pages/profile/useProfile";

const ProfilePage = () => {
    const props = useProfile();

    return <Profile {...props} />
};

export default ProfilePage;
