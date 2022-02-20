
import { useRouter } from "next/router"
import { useEffect } from "react"
import useAxios from "../../../hooks/useAxios"
import { useNotify } from "../../../hooks/useNotify"

const useConfirmPassword = () => {
    const { post } = useAxios()
    const router: any = useRouter()
    const { error, success } = useNotify()

    useEffect(() => {
        (async () => {
            try {
                await post({ url: '/auth/confirm-email', object: { email_confirmation_hash: router.query.email_confirmation_hash } })
                success()
                router.push('/login')
            } catch (e: any) {
                error(e.message)
            }
        })()
    }, [])
}

export default useConfirmPassword;