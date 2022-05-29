import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState, useEffect, SyntheticEvent } from "react";
import { DiagramConsumedRemainingProps } from ".";
import { PRODUCT_SCHEMA_PROPS } from "../../../schema/product.schema";
import { getMacroByDay } from "../../../utils/user.utils";

const useDiagramConsumedRemaining = ({ array, user }: DiagramConsumedRemainingProps) => {
    const [value, setValue] = useState<string>('1');
    const router = useRouter()
    const [object, setObject] = useState<any>({})
    const { t } = useTranslation('nutrition-diary')

    useEffect(() => {
        if (user) {
            const macro = getMacroByDay(router.query.date, user)
            let o = {
                'Proteins': { 'value': 0, 'macro': macro.proteins },
                'Carbs': { 'value': 0, 'macro': macro.carbs },
                'Sugar': { 'value': 0, 'macro': (user.sugar_percent || 0) * macro.carbs / 100 },
                'Fats': { 'value': 0, 'macro': macro.fats },
                'Fiber': { 'value': 0, 'macro': (user.fiber || 0) * (macro.proteins * 4 + macro.carbs * 4 + macro.fats * 9) / 1000 }
            }

            array.forEach(meal => {
                if (meal.length) {
                    meal.forEach((product: PRODUCT_SCHEMA_PROPS) => {
                        if (product && product.how_many) {
                            if (product.p) o['Proteins']['value'] += product.p * product.how_many
                            if (product.c) o['Carbs']['value'] += product.c * product.how_many
                            if (product.s) o['Sugar']['value'] += product.s * product.how_many
                            if (product.f) o['Fats']['value'] += product.f * product.how_many
                            if (product.fi) o['Fiber']['value'] += product.fi * product.how_many
                        }
                    })
                }
            })

            setObject(o)
        }
    }, [user, array])

    const handleChange = (event: SyntheticEvent, newValue: string) => setValue(newValue);

    return { array, user, value, handleChange, object, t }
}

export type useDiagramConsumedRemainingProps = ReturnType<typeof useDiagramConsumedRemaining>

export default useDiagramConsumedRemaining;