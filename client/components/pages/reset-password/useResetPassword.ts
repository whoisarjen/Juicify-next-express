import { zodResolver } from "@hookform/resolvers/zod";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../../hooks/useAxios";
import { useNotify } from "../../../hooks/useNotify";
import { RemindPasswordUserSchemaProps, RemindPasswordUserSchema } from "../../../schema/user.schema";

const useResetPassword = () => {
    const { post } = useAxios()
    const { t } = useTranslation('auth');
    const { error, success } = useNotify()
    const [loading, setLoading] = useState(false)

    const { register, formState: { errors }, handleSubmit } = useForm<RemindPasswordUserSchemaProps>({
        resolver: zodResolver(RemindPasswordUserSchema)
    })

    const onSubmit = async (object: RemindPasswordUserSchemaProps) => {
        try {
            setLoading(true);
            await post({ url: '/auth/reset-password', object })
            success('CHECK_YOUR_EMAIL')
        } catch (e: any) {
            error(e.message)
        } finally {
            setLoading(false);
        }
    }

    return { t, handleSubmit, onSubmit, errors, loading, register }
}

export type useResetPasswordProps = ReturnType<typeof useResetPassword>

export default useResetPassword;