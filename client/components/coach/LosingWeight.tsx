import { useState } from "react";
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import { DIET_GOAL, DIET_ACTIVITY, DIET_KIND, DIET_EXTRA_PROTEINS } from '../../utils/coach.utils'
import useTranslation from "next-translate/useTranslation";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import styled from "styled-components";

interface LosingWeightProps {
    prepareCreate: (arg0: Object) => void,
    handlePreviousStep: (arg0: string) => void
}

const Grid = styled.div`
    width: 100%;
    height: calc(100vh - var(--BothNavHeightAndPadding));
    display: grid;
    grid-template-rows: 40px 2fr 2fr 1fr 1fr 1fr 1fr auto;
    grid-gap: 5px;
    text-align: center;
`

const ArrowBack = styled.div`
    margin: auto 0;
    width: 100%;
    display: grid;
    grid-template-columns: 40px 1fr;
`

const Title = styled.div`
    font-size: 1.75rem;
    font-weight: bold;
    display: grid;
    padding: 20px 0;
    ${this} div {
        margin: auto;
    }
`

const LosingWeight = ({ prepareCreate, handlePreviousStep }: LosingWeightProps) => {
    const { t } = useTranslation('coach')
    const [goal, setGoal] = useState(0.5);
    const [kind_of_diet, setKind_of_diet] = useState(0)
    const [sport_active, setSport_active] = useState(true)
    const [activity, setActivity] = useState(1.2)

    const handleNextStep = () => {
        prepareCreate({
            goal: -goal,
            kind_of_diet,
            sport_active,
            activity,
            coach_diet: 2
        })
    }

    return (
        <Grid>
            <ArrowBack>
                <IconButton aria-label="back" onClick={() => handlePreviousStep('ChooseDiet')}>
                    <KeyboardBackspaceIcon />
                    <div />
                </IconButton>
            </ArrowBack>
            <Title><div>{t('LOSING_WEIGHT')}</div></Title>
            <div>{t('LOSING_WEIGHT_DESCRIPTION')}</div>
            <Box>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{t('DIET_GOAL_TITLE')}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={goal}
                        label={t('DIET_GOAL_TITLE')}
                        onChange={e => setGoal(parseFloat(e.target.value.toString()))}
                    >
                        {
                            DIET_GOAL.map(x =>
                                <MenuItem key={x.value} value={x.value}>{t(x.name)}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
            </Box>
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
            <Box>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{t('DIET_EXTRA_PROTEINS_TITLE')}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sport_active}
                        label={t('DIET_EXTRA_PROTEINS_TITLE')}
                        onChange={() => setSport_active(state => !state)}
                    >
                        {
                            DIET_EXTRA_PROTEINS.map(x =>
                                <MenuItem key={x.value} value={x.value}>{t(x.name)}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
            </Box>
            <Button variant="contained" onClick={handleNextStep}>{t('COUNT_DIET')}</Button>
        </Grid>
    )
}

export default LosingWeight;