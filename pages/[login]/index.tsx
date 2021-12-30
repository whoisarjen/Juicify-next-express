import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import Navbar from "../../components/profile/Navbar";
import { useDailyMeasurements } from "../../hooks/useDailyMeasurements";
import styles from '../../styles/profile.module.css'
import { addDaysToDate, getShortDate } from '../../utils/manageDate';

const Profile: FunctionComponent = () => {
    const [{ data, user }]: any = useDailyMeasurements(addDaysToDate(getShortDate(), -1), 7)

    return (
        <div className="profile">
            <Navbar user={user} tab={0} />
            <div className={styles.profileContent}>
                {
                    data && data.map((daily, index) =>
                        <p key={daily._id}>{index}. {daily.whenAdded}</p>
                    )
                }
            </div>
        </div>
    );
};

export default Profile;
