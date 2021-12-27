import { FunctionComponent } from "react";
import { useAppSelector } from "../../hooks/useRedux";
import styles from '../../styles/settings.module.css'
import useSettings from "../../hooks/useSettings";

const Tab4: FunctionComponent<any> = ({ marginBottom }) => {
    const [, changePassword] = useSettings()
    const token: any = useAppSelector(state => state.token.value)


    changePassword({})

    return (
        <div className={styles.settingsTab}>
            TAB 4 {token.login}
        </div>
    )
}

export default Tab4;