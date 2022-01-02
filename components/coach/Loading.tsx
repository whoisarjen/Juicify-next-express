import { FunctionComponent } from "react";
import styles from '../../styles/coach.module.css'
import Spinner from "../common/Spinner";

const Loading: FunctionComponent = () => {
    return (
        <div className={styles.loading}>
            <Spinner />
        </div>
    )
}

export default Loading;