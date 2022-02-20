import NoteAltIcon from '@mui/icons-material/NoteAlt'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import { reverseDateDotes } from '../../../../utils/date.utils';
import styled from 'styled-components'
import { useWorkoutBoxProps } from './useWorkoutBox';
import BetterLink from '../../../common/better-link';

const Grid = styled.div`
    min-height: 140px;
    width: calc(100% - 20px);
    padding: 10px;
    margin-top: 12px;
    border-radius: 8px;
    cursor: pointer;
    color: #fff;
    background: #1976d2;
    box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
        0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
    display: grid;
    grid-template-columns: auto 100px;
`

const Text = styled.div`
    margin-left: 10px;
    margin-block-end: 0.83em;
    ${this} h2 {
        margin-block-end: 0.415em;
    }
`

const Icon = styled.div`
    margin: auto;
    grid-column: 2;
    grid-row: 1 / 3;
    ${this} svg {
        font-size: 2rem;
    }
`

const NotSavedText = styled.div`
    margin: auto;
    margin-left: 10px;
`

const BaseWorkoutBox = ({ title = '', description = '', route, type, isNotSaved, whenAdded, getTheme, t }: useWorkoutBoxProps) => {
    return (
        <BetterLink href={route}>
            <Grid style={{ background: isNotSaved ? 'red' : getTheme('PRIMARY') }}>
                
                <Text>
                    <h2>{title}</h2>
                    <div>{description}</div>
                </Text>

                <Icon>
                    {
                        type === 0
                            ?
                            <FitnessCenterIcon />
                            :
                            <NoteAltIcon />
                    }
                </Icon>

                {whenAdded && <NotSavedText>{reverseDateDotes(whenAdded)}</NotSavedText>}
                
                {isNotSaved && <NotSavedText>{t('Notsaved')}</NotSavedText>}
            </Grid>
        </BetterLink>
    )
}

export default BaseWorkoutBox;