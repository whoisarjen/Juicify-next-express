import { zodResolver } from "@hookform/resolvers/zod";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUserSchema, CreateUserSchemaProps } from "../../../schema/user.schema";
import useAxios from "../../../hooks/useAxios";
import { useNotify } from "../../../hooks/useNotify";

const useRegister = () => {
    const { post } = useAxios()
    const router = useRouter();
    const { t } = useTranslation();
    const { success, error } = useNotify()
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState(new Date())

    const { register, formState: { errors }, handleSubmit, setValue } = useForm<CreateUserSchemaProps>({
        resolver: zodResolver(CreateUserSchema)
    })

    const registerUser = async (object: CreateUserSchemaProps) => {
        try {
            if (!object.rules) {
                return error('ACCEPT_RULES');
            }
            setLoading(true);
            await post({ url: '/auth/register', object })
            success('CHECK_YOUR_EMAIL')
            router.push(`/login`);
        } catch (e: any) {
            console.log(e.message)
            error(e.message)
        } finally {
            setLoading(false);
        }
    }

    return { registerUser, t, loading, register, errors, handleSubmit, date, setDate, setValue }
}

export type useRegisterProps = ReturnType<typeof useRegister>

export default useRegister;