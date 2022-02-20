import BaseProfile from "./Profile";
import useProfile from "./useProfile";

const Profile = () => {
    const props = useProfile()

    return <BaseProfile {...props} />
};

export default Profile;