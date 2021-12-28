import { FunctionComponent } from "react";
import { expectLoggedIN } from "../utils/checkAuth";
import styles from '../styles/coach.module.css'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Link from 'next/link'

const coachOptions = [
    { link: '', title: 'Muscle build', description: 'Juicify gona prepare program, which will allow you to optimal grow muscle, while keeping fat as low as it is possible.' },
    { link: '', title: 'Recomposition' },
    { link: '', title: 'Lose weight' },
    { link: '', title: 'Reverse diet' },
    { link: '', title: 'Custome' }
]

const Coach: FunctionComponent = () => {
    expectLoggedIN()

    return (
        <div className="coach">
            <div className="title">Program type</div>
            <div className="description">Choose program type, which best fit your goal.</div>
            {
                coachOptions.map((option, index) =>
                    <Link href={`/${option.link}`}>
                        <a>
                            <div className={styles.coachOption} key={index}>
                                <div>
                                    <div className={styles.coachOptionTitle}>{option.title}</div>
                                    <div className={styles.coachOptionDescription}>{coachOptions[0].description}</div>
                                </div>
                                <KeyboardArrowRightIcon className={styles.centeredIcon} />
                            </div>
                        </a>
                    </Link>
                )
            }
        </div>
    );
};

export default Coach;