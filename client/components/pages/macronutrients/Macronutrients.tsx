import Bar from './bar'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import SimpleSlider from "./simpleSlider";
import BottomFlyingButton from '../../common/button-submit-items'
import Button from '@mui/material/Button';
import OwnMacro from "./ownMacro";
import styled from 'styled-components'
import { useMacronutrientsProps } from './useMacronutrients';

const Box = styled.div`
    display: grid;
    width: 100%;
    margin: 0 auto;
    max-width: 702px;
    min-height: calc(100vh - var(--BothNavHeightAndPadding));
`

const Grid = styled.div`
    width: 100%;
    height: calc( 100% - 50px );
    display: grid;
    grid-template-rows: 2fr 1fr;
`

const Grid__bar = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto;
    column-gap: 5px;
    cursor: pointer;
    transition: all .2s ease-in-out;
`

const Grid__slider = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
`

const Grid__description = styled.div`
    text-align: center;
    margin: auto;
    display: grid;
    grid-template-rows: 1fr auto;
    width: 100%;
    height: 100%;
    ${this} div{
        margin: auto;
    }
    ${this} button{
        margin: auto;
    }
`

const Title = styled.div`
    font-size: 2rem;
    margin-bottom: 10px;
    font-weight: bold;
`

const BaseMacronutrients = ({ changeObject, openChange, toggleLock, changed, isOwnMacro, setIsOwnMacro, macro, save, t }: useMacronutrientsProps) => {
    return (
        <>
            <Box>
                <div>
                    {
                        Object.keys(changeObject).length == 0 &&
                        <Title>{t('TITLE')}</Title>
                    }
                    <Grid>
                        <Grid__bar>
                            {
                                macro?.length > 0 &&
                                macro.map((x: any) =>
                                    <Bar
                                        key={x.day}
                                        object={x}
                                        click={() => openChange(x)}
                                        toggleLock={() => toggleLock(x)}
                                        t={t}
                                    />
                                )
                            }
                        </Grid__bar>
                        {
                            Object.keys(changeObject).length > 0 ?
                                (
                                    <Grid__slider>
                                        {
                                            [...Object.keys(changeObject)].map(x =>
                                                x != 'day' &&
                                                x != 'locked' &&
                                                x != 'choosen' &&
                                                <SimpleSlider
                                                    key={x}
                                                    day={changeObject['day'] + changeObject[x]}
                                                    title={x}
                                                    beginValue={changeObject[x]}
                                                    macro={macro}
                                                    changed={(value) => changed(value, x)}
                                                />
                                            )
                                        }
                                    </Grid__slider>
                                ) : (
                                    <Grid__description>
                                        <div>
                                            {t('DESCRIPTION')} <LockOpenIcon /> {t('DESCRIPTION_2')}
                                        </div>
                                        <Button variant="contained" onClick={() => setIsOwnMacro(true)}>{t('BUTTON')}</Button>
                                    </Grid__description>
                                )
                        }
                    </Grid>
                    {
                        Object.keys(changeObject).length > 0 &&
                        <BottomFlyingButton clicked={save} />
                    }
                </div>
            </Box>
            <OwnMacro isOwnMacro={isOwnMacro} close={() => setIsOwnMacro(false)} />
        </>
    )
}

export default BaseMacronutrients;