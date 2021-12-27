import { FunctionComponent } from "react";
import { useAppSelector } from "../../hooks/useRedux";
import styles from '../../styles/settings.module.css'
import SelectLanguage from '../common/SelectLanguage'

const Tab3: FunctionComponent<any> = ({ marginBottom }) => {
    const token: any = useAppSelector(state => state.token.value)

    return (
        <div className={styles.settingsTab}>
            <SelectLanguage />
        </div>
    )
}

export default Tab3;