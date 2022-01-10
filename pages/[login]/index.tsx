import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import StackedBarChart from "../../components/common/StackedBarChart";
import Navbar from "../../components/profile/Navbar";
import { useDailyMeasurements } from "../../hooks/useDailyMeasurements";
import styles from '../../styles/profile.module.css'
import { addDaysToDate, getShortDate, reverseDateDotes } from '../../utils/manageDate';

const Profile: FunctionComponent = () => {
    const [{ data, user }]: any = useDailyMeasurements(addDaysToDate(getShortDate(), -1), 7)
    const barNamesWithColor = [
        {dataKey: 'p', fill: '#ff8b42'},
        {dataKey: 'c', fill: '#ffbb33'},
        {dataKey: 'f', fill: '#90c253'}
    ]
    const nutrition_diary = data.map(x => {
        let object = {
            name: '',
            p: 0,
            c: 0,
            f: 0
        }
        if (x.nutrition_diary) {
            object.name = reverseDateDotes(x.whenAdded).slice(0, 5)
            x.nutrition_diary.map(meal => {
                if (meal.p) {
                    object.p += meal.p * meal.how_many
                }
                if (meal.c) {
                    object.c += meal.c * meal.how_many
                }
                if (meal.f) {
                    object.f += meal.f * meal.how_many
                }
            })
        }
        return object
    })

    return (
        <>
            <Navbar user={user} tab={0} />
            <div className="profile">
                <StackedBarChart data={nutrition_diary.reverse()} barNamesWithColor={barNamesWithColor} />
                <div className={styles.profileContent}>
                </div>
            </div>
        </>
    );
};

export default Profile;
