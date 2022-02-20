import { useMemo } from "react";
import { ToastContainer, toast } from 'react-toastify'
import { NotifyContext } from '../../hooks/useNotify'
import useTranslation from 'next-translate/useTranslation'

const Notify = ({ children }: { children: any }) => {
    const { t } = useTranslation('error')

    const notifyOptions = useMemo(
        () => ({
            success: (text: string = 'Success') => {
                toast.success(t(text), {
                    position: "bottom-right",
                    autoClose: 2000,
                    closeOnClick: true,
                })
            },
            error: (text: string = 'Error') => {
                toast.error(t(text), {
                    position: "bottom-right",
                    autoClose: 2000,
                    closeOnClick: true,
                })
            },
        }),
        [t],
    );

    return (
        <NotifyContext.Provider value={notifyOptions}>
            {children}
            <ToastContainer />
        </NotifyContext.Provider>
    )
}

export default Notify;