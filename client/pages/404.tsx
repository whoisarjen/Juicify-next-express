import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";

const Error404: FunctionComponent = () => {
    const { t } = useTranslation('error')

    return (
        <div className="error404">
            <div className="error404box">
                <h1>404</h1>
                <h2>{t('ERROR_404')}</h2>
            </div>
        </div>
    );
};

export default Error404;
