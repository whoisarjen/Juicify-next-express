import { FunctionComponent } from "react";
import styles from '../../styles/nutrition-diary.module.css'
import Share from "../common/Share";
import DateChanger from "../common/DateChanger";
import useTranslation from "next-translate/useTranslation";


const Navbar: FunctionComponent = () => {
    const { t } = useTranslation('nutrition-diary')

    return (
        <div className={styles.navbar}>
            <div className="title">{t('title')}</div>
            <Share />
            <DateChanger />
        </div>
    )
}

export default Navbar;