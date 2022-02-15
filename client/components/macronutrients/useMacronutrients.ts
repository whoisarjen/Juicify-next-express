import useTranslation from "next-translate/useTranslation"
import { useState, useEffect } from "react"
import { useAppSelector } from "../../hooks/useRedux"
import useSettings from "../settings/useSettings"

const useMacronutrients = () => {
    const { changeSettings } = useSettings()
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

    return { changeObject, openChange, toggleLock, changed, isOwnMacro, setIsOwnMacro, macro, save, t }
}

export type useMacronutrientsProps = ReturnType<typeof useMacronutrients>

export default useMacronutrients;