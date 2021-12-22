import Link from 'next/link'
import styles from '../../styles/workout.module.css'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import useTranslation from "next-translate/useTranslation";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'

const Box = ({ title, description, route, type, isNotSaved }) => {
    const { t } = useTranslation('workout');
    
    return (
        <Link href={route}>
            <a>
                <div className={styles.box} style={{ background: isNotSaved ? 'red' : '' }}>
                    <div className={styles.boxText}>
                        <h2>{title}</h2>
                        <div className={styles.boxTextDescription}>{description}</div>
                    </div>
                    <div className={styles.boxImage}>
                        {
                            type === 0
                                ?
                                <FitnessCenterIcon />
                                :
                                <NoteAltIcon />
                        }
                    </div>
                    {
                        isNotSaved &&
                        <div className={styles.boxTextNotSaved}>
                            {t('Not saved')}
                        </div>
                    }
                </div>
            </a>
        </Link>
    )
}

export default Box