import { FunctionComponent } from "react";
import { useAppSelector } from "../../hooks/useRedux";
import styles from '../../styles/settings.module.css'

const Tab4: FunctionComponent = () => {
    const token: any = useAppSelector(state => state.token.value)

    return (
        <div className={styles.settingsTab}>
            TAB 4 {token.login}
        </div>
    )
}

export default Tab4;