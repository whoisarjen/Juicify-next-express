import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";
import StackedBarChart from "../../components/common/StackedBarChart";
import Navbar from "../../components/profile/Navbar";
import { useDailyMeasurements } from "../../hooks/useDailyMeasurements";
import styles from '../../styles/profile.module.css'
import { addDaysToDate, getShortDate, reverseDateDotes } from '../../utils/manageDate';

const Profile: FunctionComponent = () => {
    const { t } = useTranslation('profile')
    const [{ data, user }]: any = useDailyMeasurements(addDaysToDate(getShortDate(), -1), 7)
    const barNamesWithColor = [
        {dataKey: t('p'), fill: '#ff8b42'},
        {dataKey: t('c'), fill: '#ffbb33'},
        {dataKey: t('f'), fill: '#90c253'}
    ]
    const nutrition_diary = data.map(x => {
        let object = {
            name: '',
            [t('p')]: 0,
            [t('c')]: 0,
            [t('f')]: 0
        }
        if (x.nutrition_diary) {
            object.name = reverseDateDotes(x.whenAdded).slice(0, 5)
            x.nutrition_diary.map(meal => {
                if (meal.p) {
                    const p = object[t('p')]
                    object[t('p')] = meal.p * meal.how_many + parseFloat(p.toString())
                }
                if (meal.c) {
                    const c = object[t('c')]
                    object[t('c')] = meal.c * meal.how_many + parseFloat(c.toString())
                }
                if (meal.f) {
                    const f = object[t('f')]
                    object[t('f')] = meal.f * meal.how_many + parseFloat(f.toString())
                }
            })
        }
        console.log(object)
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
