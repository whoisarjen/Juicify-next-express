import axios from "axios";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";
import Spinner from "../../components/common/Spinner";
import { useNotify } from "../../hooks/useNotify";

const ConfirmPassword: FunctionComponent = () => {
    const router: any = useRouter()
    const [{ error, success }] = useNotify()

    useEffect(() => {
        (async () => {
            try {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_SERVER}/auth/confirm-email`,
                    { email_confirmation_hash: router.query.email_confirmation_hash },
                    { withCredentials: true }
                );
                success()
                router.push('/login')
            } catch (e: any) {
                error(e.message)
            }
        })()
    }, [])

    return (
        <div className="confirmPassword">
            <Spinner />
        </div>
    );
};

export default ConfirmPassword;
