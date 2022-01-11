import { createContext, useContext } from "react";

const NotifyContext = createContext({
    error: (text: string = 'Error') => { },
    success: (text: string = 'Success') => { }
});

const useNotify = () => {
    const notify = useContext(NotifyContext);

    const success = (text?: string) => {
        notify.success(text)
    }

    const error = (text?: string) => {
        notify.error(text)
    }

    return [{ error, success }]
}

export {
    useNotify,
    NotifyContext
}