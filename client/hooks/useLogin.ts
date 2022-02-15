import { zodResolver } from "@hookform/resolvers/zod";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateSessionSchemaProps, CreateSessionSchema } from "../schema/session.schema";
import { readToken } from "../utils/auth.utils";
import { getShortDate } from "../utils/date.utils";
import { createIndexedDB, addIndexedDB } from "../utils/indexedDB.utils";
import useAxios from "./useAxios";
import useToken from "./useToken";

const useLogin = () => {
    const { dispatchToken } = useToken()
    const { post } = useAxios()
    const router = useRouter();
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)

    const { register, formState: { errors }, handleSubmit } = useForm<CreateSessionSchemaProps>({
        resolver: zodResolver(CreateSessionSchema)
    })

    const login = async (object: CreateSessionSchemaProps) => {
        try {
            setLoading(true);
            const response = await post({ url: '/auth/login', object })
            await createIndexedDB()
            const keys = Object.keys(response.data)
            for (let i = 0; i < keys.length; i++) {
                if (keys[i] != 'token' && keys[i] != 'refresh_token') {
                    await addIndexedDB(keys[i], response.data[keys[i]])
                }
            }
            await dispatchToken(response.data.token)
            router.push(`/${(await readToken(response.data.token)).login}/nutrition-diary/${getShortDate()}`);
        } catch (e: any) {
            console.log(e.message)
        } finally {
            setLoading(false);
        }
    }

    return { login, register, errors, handleSubmit, loading, t }
}

export default useLogin;