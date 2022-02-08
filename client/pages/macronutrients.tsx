import { FunctionComponent, useState, useEffect } from "react";
import Bar from '../components/macronutrients/Bar'
import { useAppSelector } from "../hooks/useRedux";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import SimpleSlider from "../components/macronutrients/SimpleSlider";
import BottomFlyingButton from '../components/common/BottomFlyingButton'
import useSettings from '../hooks/useSettings'
import Button from '@mui/material/Button';
import OwnMacro from "../components/macronutrients/OwnMacro";
import useTranslation from "next-translate/useTranslation";
import styled from 'styled-components'

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

const Macronutrients: FunctionComponent = () => {
    const [changeSettings] = useSettings()
    const token: any = useAppSelector(state => state.token.value)
    const [macro, setMacro] = useState<Array<any>>([])
    const [changeObject, setChangeObject] = useState<any>({})
    const [isOwnMacro, setIsOwnMacro] = useState(false)
    const { t } = useTranslation('macronutrients')

    const changed = (newValue: any, key: string) => {
        let newMacro = JSON.parse(JSON.stringify(macro))
        newMacro[changeObject.day - 1][key] = newValue

        let value = newValue - changeObject[key]
        let numberPossibleObjectChange = macro.filter(x => !x.locked && x.day != changeObject.day).length

        newMacro.forEach((x: any) => {
            if (!x.locked && x.day != changeObject.day) {
                let minus = Math.ceil(value / numberPossibleObjectChange)
                if (x[key] - minus < 0) {
                    minus = x[key]
                }
                value -= minus
                numberPossibleObjectChange -= 1
                x[key] -= minus
            }
        })

        if (value) {
            newMacro.forEach((x: any) => {
                if (!x.locked && x.day != changeObject.day) {
                    let minus = value
                    if (x[key] - minus < 0) {
                        minus = x[key]
                    }
                    value -= minus
                    numberPossibleObjectChange -= 1
                    x[key] -= minus

                }
            })
        }

        setMacro(newMacro)
        setChangeObject({ ...changeObject, ...{ [key]: newValue }, ...{ choosen: true } })
    }

    const save = async () => {
        let isNewValue = false;
        for (let i = 0; i < macro.length; i++) {
            if (
                macro[i].proteins != token.macronutrients[i].proteins ||
                macro[i].carbs != token.macronutrients[i].carbs ||
                macro[i].fats != token.macronutrients[i].fats
            ) {
                isNewValue = true;
                break;
            }
        }

        if (isNewValue) {
            await changeSettings({ macronutrients: macro })
        }

        setChangeObject({})
        setMacro(macro.map(x => {
            x.choosen = false
            return x
        }))
    }

    const openChange = (object: any) => {
        setChangeObject(object)
        let newMacro = macro
        newMacro.map((x: any) => {
            x.choosen = false
            if (object.day === x.day) {
                x.choosen = true
            }
            return x
        })
        setMacro(newMacro)
    }

    const toggleLock = (object: any) => {
        let newMacro = JSON.parse(JSON.stringify(macro))
        newMacro[object.day - 1].locked = !newMacro[object.day - 1].locked
        setMacro(newMacro)
    }

    useEffect(() => {
        if (token && token.macronutrients) {
            let newMacro = JSON.parse(JSON.stringify(token.macronutrients))
            setMacro(newMacro.map((x: any, index: number) => {
                x.locked = false
                x.day = index + 1
                return x
            }))
        }
    }, [])

    return (
        <>
            <Box>
                <div>
                    {
                        Object.keys(changeObject).length == 0 &&
                        <div className="title">{t('TITLE')}</div>
                    }
                    <Grid>
                        <Grid__bar>
                            {
                                macro &&
                                macro.length &&
                                macro.map(x =>
                                    <Bar
                                        key={x.day}
                                        object={x}
                                        click={() => openChange(x)}
                                        toggleLock={() => toggleLock(x)}
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
                        <BottomFlyingButton clicked={save} isLoading={false} />
                    }
                </div>
            </Box>
            <OwnMacro isOwnMacro={isOwnMacro} close={() => setIsOwnMacro(false)} />
        </>
    )
}

export default Macronutrients;