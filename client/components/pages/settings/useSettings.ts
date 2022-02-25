import { useNotify } from "../../../hooks/useNotify";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import useTranslation from "next-translate/useTranslation";
import { useAppSelector } from "../../../hooks/useRedux";
import { SettingsSchema, SettingsSchemaProps } from "../../../schema/user.schema";
import useAxios from "../../../hooks/useAxios";
import useToken from "../../../hooks/useToken";
import useAuth from "../../../hooks/useAuth";

const useSettings = () => {
    const { post } = useAxios();
    const { logout } = useAuth();
    const { dispatchToken } = useToken()
    const { success, error } = useNotify()
    const { t } = useTranslation('settings')
    const token: any = useAppSelector(state => state.token.value)

    const changeSettings = async (object: SettingsSchemaProps) => {
        try {
            const response = await post({ object, url: '/auth/change' });
            await dispatchToken(response.data.token)
            success()
        } catch (e: any) {
            console.log(e)
        }
    }

    const { register, formState: { errors, isDirty }, handleSubmit, reset } = useForm<SettingsSchemaProps>({
        resolver: zodResolver(SettingsSchema)
    })

    useEffect(() => reset(token), [token._id])

    return { changeSettings, isDirty, errors, register, handleSubmit, t, logout }
}

export type useSettingsProps = ReturnType<typeof useSettings>

export default useSettings;