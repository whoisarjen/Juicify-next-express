import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styled from "styled-components";
import { useCircularReversedProps } from "./useCircularReversed";

const Grid = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
`

const CircularBox = styled.div`
    max-width: 110px;
    max-height: 110px;
    margin: auto;
    ${this} .CircularProgressbar-text {
        dominant-baseline: middle !important;
        text-anchor: middle !important;
        font-size: 15px !important;
    }
`

const CircularReversed = ({ progress, calories, getTheme, t }: useCircularReversedProps) => {
    return (
        <Grid>
            <CircularBox>
                <CircularProgressbar
                    value={100 - progress}
                    text={`${calories}${t('Kcal')}`}
                    styles={buildStyles({
                        pathTransitionDuration: 0.5,
                        pathColor: getTheme('PRIMARY'),
                        textColor: 'rgba(122, 122, 122, 1',
                        trailColor: '#d6d6d6',
                        backgroundColor: getTheme('PRIMARY'),
                    })}
                />
            </CircularBox>
        </Grid>
    )
}

export default CircularReversed;