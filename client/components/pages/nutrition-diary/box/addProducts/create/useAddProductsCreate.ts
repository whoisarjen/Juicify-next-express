import { zodResolver } from "@hookform/resolvers/zod"
import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { AddProductsCreateProps } from "."
import { useNotify } from "../../../../../../hooks/useNotify"
import { useAppSelector } from "../../../../../../hooks/useRedux"
import { ProductSchemaProps, ProductSchema } from "../../../../../../schema/product.schema"
import { insertThoseIDStoDB } from "../../../../../../utils/db.utils"

const useAddProductsCreate = ({ closeCreateProduct, isCreateProduct, created, defaultBarcode }: AddProductsCreateProps) => {
    const { t } = useTranslation('nutrition-diary')
    const [code, setCode] = useState(defaultBarcode)
    const [loading, setLoading] = useState(false)
    const token: any = useAppSelector(state => state.token.value)
    const { success, error } = useNotify()

    const { register, formState: { errors }, handleSubmit } = useForm<ProductSchemaProps>({
        resolver: zodResolver(ProductSchema)
    })

    const onSubmit = async (values: ProductSchemaProps) => {
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

    return { closeCreateProduct, isCreateProduct, defaultBarcode, handleSubmit, register, onSubmit, errors, code, setCode, loading, t }
}

export type useAddProductsCreateProps = ReturnType<typeof useAddProductsCreate>

export default useAddProductsCreate;