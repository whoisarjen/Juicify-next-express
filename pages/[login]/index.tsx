import { FunctionComponent } from "react";
import Navbar from "../../components/profile/Navbar";
import { useAppSelector } from "../../hooks/useRedux";
import styles from '../../styles/profile.module.css'

const Profile: FunctionComponent = () => {
    const user: any = useAppSelector(state => state.token.value)

    return (
        <div className="profile">
            <Navbar user={user} tab={0} />
            <div className={styles.profileContent}>
                1232113221132
            </div>
        </div>
    );
};

export default Profile;
