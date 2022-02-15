import { createContext, useContext } from "react";

export const NotifyContext = createContext({
    error: (text: string = 'Error') => { },
    success: (text: string = 'Success') => { }
});

export const useNotify = () => {
    const notify = useContext(NotifyContext);

    const success = (text?: string) => {
        notify.success(text)
    }

    const error = (text?: string) => {
        notify.error(text)
    }

    return { error, success }
}