import { FunctionComponent, useState, useEffect } from "react";
import { expectLoggedIN } from "../utils/checkAuth";
import Bar from '../components/Macronutrients/Bar'
import styles from '../styles/macronutrients.module.css'
import { useAppSelector } from "../hooks/useRedux";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import SimpleSlider from "../components/Macronutrients/SimpleSlider";
import BottomFlyingButton from '../components/common/BottomFlyingButton'
import useSettings from '../hooks/useSettings'

const Macronutrients: FunctionComponent = () => {
    expectLoggedIN()
    const [changeSettings] = useSettings()
    const token: any = useAppSelector(state => state.token.value)
    const [macro, setMacro] = useState<Array<any>>([])
    const [changeObject, setChangeObject] = useState<any>({})

    const changed = (newValue, key) => {
        let newMacro = JSON.parse(JSON.stringify(macro))
        newMacro[changeObject.day - 1][key] = newValue

        let value = newValue - changeObject[key]
        let numberPossibleObjectChange = macro.filter(x => !x.locked && x.day != changeObject.day).length
        newMacro.forEach(x => {
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
            newMacro.forEach(x => {
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
    }

    const openChange = (object) => {
        setChangeObject(object)
        let newMacro = macro
        newMacro.map(x => {
            x.choosen = false
            if (object.day === x.day) {
                x.choosen = true
            }
            return x
        })
        setMacro(newMacro)
    }

    const toggleLock = (object) => {
        let newMacro = JSON.parse(JSON.stringify(macro))
        newMacro[object.day - 1].locked = !newMacro[object.day - 1].locked
        setMacro(newMacro)
    }

    useEffect(() => {
        if (token && token.macronutrients) {
            let newMacro = JSON.parse(JSON.stringify(token.macronutrients))
            setMacro(newMacro.map(x => {
                x.locked = false
                return x
            }))
        }
    }, [token])

    return (
        <div className="contentGrid">
            <div>
                {
                    Object.keys(changeObject).length == 0 &&
                    <div className="title">Macronutrients</div>
                }
                <div className={styles.mainGrid}>
                    <div className={styles.mainGridMacroBox}>
                        {
                            macro &&
                            macro.map(x =>
                                <Bar
                                    key={x.day}
                                    object={x}
                                    click={openChange}
                                    toggleLock={toggleLock}
                                />
                            )
                        }
                    </div>
                    {
                        Object.keys(changeObject).length > 0 ?
                            (
                                <div className={styles.sliderGrid}>
                                    {
                                        [...Object.keys(changeObject)].map(x =>
                                            x != 'day' &&
                                            x != 'locked' &&
                                            x != 'choosen' &&
                                            <SimpleSlider
                                                day={changeObject['day']}
                                                title={x}
                                                beginValue={changeObject[x]}
                                                macro={macro}
                                                changed={(value) => changed(value, x)}
                                            />
                                        )
                                    }
                                </div>
                            ) : (
                                <div className={styles.mainGridDescription}>
                                    Click bar to change macro for this day. The diffrent will put on unlocked days. Click <LockOpenIcon /> to lock day. Week macro will stay same.
                                </div>
                            )
                    }
                </div>
                {
                    Object.keys(changeObject).length > 0 &&
                    <BottomFlyingButton clicked={save} isLoading={false} />
                }
            </div>
        </div>
    )
}

export default Macronutrients;