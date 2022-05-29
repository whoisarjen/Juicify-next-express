import { zodResolver } from "@hookform/resolvers/zod"
import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { DialogCreateProductProps } from "."
import { useNotify } from "../../../hooks/useNotify"
import { useAppSelector } from "../../../hooks/useRedux"
import { PRODUCT_SCHEMA_PROPS, ProductSchema } from "../../../schema/product.schema"
import { insertThoseIDStoDB } from "../../../utils/db.utils"

const useDialogCreateProduct = ({ children, created, defaultBarcode = 0 }: DialogCreateProductProps) => {
    const { t } = useTranslation('nutrition-diary')
    const [code, setCode] = useState(defaultBarcode)
    const [loading, setLoading] = useState(false)
    const token: any = useAppSelector(state => state.token.value)
    const { success, error } = useNotify()
    const [isDialog, setIsDialog] = useState(false)

    const { register, formState: { errors }, handleSubmit } = useForm<PRODUCT_SCHEMA_PROPS>({
        resolver: zodResolver(ProductSchema)
    })

    const onSubmit = async (values: PRODUCT_SCHEMA_PROPS) => {
        try {
            const copyValues = { ...values }
            for (const key in copyValues) {
                if (copyValues[key as keyof typeof copyValues] == false) {
                    delete copyValues[key as keyof typeof copyValues];
                }
            }
            await insertThoseIDStoDB('product', [{ ...copyValues, ...(code && { code }), user_ID: token._id }])
            created(copyValues.name)
            success()
        } catch (e: any) {
            error(e.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (defaultBarcode > 0) {
            setIsDialog(true)
        }
    }, [defaultBarcode])

    return { children, isDialog, setIsDialog, defaultBarcode, handleSubmit, register, onSubmit, errors, code, setCode, loading, t }
}

export type useDialogCreateProductProps = ReturnType<typeof useDialogCreateProduct>

export default useDialogCreateProduct;