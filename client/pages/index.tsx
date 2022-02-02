import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import styles from '../styles/home.module.css'

const Home: FunctionComponent = () => {
    const router: any = useRouter()
    router.push('/login')
    return (
        <div className={styles.home}>
            Home

        </div>
    );
}

export default Home;