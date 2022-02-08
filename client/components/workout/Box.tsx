import Link from 'next/link'
import styles from '../../styles/workout.module.css'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import useTranslation from "next-translate/useTranslation";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import { FunctionComponent } from 'react';
import { reverseDateDotes } from '../../utils/date.utils';
import { useTheme } from '../../hooks/useTheme';

interface BoxProps {
    title?: string,
    description?: string,
    route: string,
    type: number,
    isNotSaved?: boolean,
    whenAdded?: string
}

const Box: FunctionComponent<BoxProps> = ({ title = '', description = '', route, type, isNotSaved, whenAdded }) => {
    const { t } = useTranslation('workout');
    const [getTheme]: any = useTheme()

    return (
        <Link href={route}>
            <a>
                <div className={styles.box} style={{ background: isNotSaved ? 'red' : getTheme('PRIMARY') }}>
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
                        whenAdded &&
                        <div className={styles.boxTextNotSaved}>
                            {reverseDateDotes(whenAdded)}
                        </div>
                    }
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