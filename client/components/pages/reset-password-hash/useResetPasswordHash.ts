import { useRouter } from "next/router"
import { useEffect } from "react"
import useAxios from "../../../hooks/useAxios"
import { useNotify } from "../../../hooks/useNotify"

const useResetPasswordHash = () => {
    const { post } = useAxios()
    const router: any = useRouter()
    const { error, success } = useNotify()

    useEffect(() => {
        (async () => {
            try {
                await post({ url: '/auth/reset-password-confirmation', object: { password_remind_hash: router.query.password_remind_hash } })
                success('CHECK_YOUR_EMAIL')
                router.push('/login')
            } catch (e: any) {
                error(e.message)
            }
        })()
    }, [])
}

export type useResetPasswordHashProps = ReturnType<typeof useResetPasswordHash>

export default useResetPasswordHash;