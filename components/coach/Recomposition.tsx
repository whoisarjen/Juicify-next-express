import { FunctionComponent, useState } from "react";
import Button from '@mui/material/Button';
import styles from '../../styles/coach.module.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import { DIET_ACTIVITY, DIET_KIND } from '../../utils/manageCoach'
import useTranslation from "next-translate/useTranslation";

interface RecompositionProps {
    prepareCreate: (arg0: Object) => void
}

const Recomposition: FunctionComponent<RecompositionProps> = ({ prepareCreate }) => {
    const { t } = useTranslation('coach')
    const [kind_of_diet, setKind_of_diet] = useState(0)
    const [activity, setActivity] = useState(1.2)

    const handleNextStep = () => {
        prepareCreate({
            'goal': 0,
            kind_of_diet,
            'sport_active': true,
            activity,
            coach_diet: 1
        })
    }

    return (
        <div className={styles.recomposition}>
            <div className={styles.AddWeightMainTitle}><div>{t('RECOMPOSITION')}</div></div>
            <div>{t('RECOMPOSITION_DESCRIPTION')}</div>
            <Box>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{t('DIET_ACTIVITY_TITLE')}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={activity}
                        label={t('DIET_ACTIVITY_TITLE')}
                        onChange={e => setActivity(parseFloat(e.target.value.toString()))}
                    >
                        {
                            DIET_ACTIVITY.map(x =>
                                <MenuItem key={x.value} value={x.value}>{t(x.name)}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
            </Box>
            <Box>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{t('DIET_KIND_TITLE')}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={kind_of_diet}
                        label={t('DIET_KIND_TITLE')}
                        onChange={e => setKind_of_diet(parseInt(e.target.value.toString()))}
                    >
                        {
                            DIET_KIND.map(x =>
                                <MenuItem key={x.value} value={x.value}>{t(x.name)}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
            </Box>
            <Button variant="contained" onClick={handleNextStep}>{t('COUNT_DIET')}</Button>
        </div>
    )
}

export default Recomposition;