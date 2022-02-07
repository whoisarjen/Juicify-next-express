import axios from "axios";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";
import Spinner from "../../components/common/Spinner";
import { useNotify } from "../../hooks/useNotify";

const ResetPasswordHash: FunctionComponent = () => {
    const router: any = useRouter()
    const [{ error, success }] = useNotify()

    useEffect(() => {
        (async () => {
            try {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_SERVER}/auth/reset-password-confirmation`,
                    { reset_password_hash: router.query.reset_password_hash },
                    { withCredentials: true }
                );
                success('CHECK_YOUR_EMAIL')
                router.push('/login')
            } catch (e: any) {
                error(e.message)
            }
        })()
    }, [])

    return (
        <div className="ResetPasswordHash">
            <Spinner />
        </div>
    );
};

export default ResetPasswordHash;
