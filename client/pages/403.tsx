import useTranslation from "next-translate/useTranslation";
import { FunctionComponent } from "react";

const Error403: FunctionComponent = () => {
    const { t } = useTranslation('error')

    return (
        <div className="error403">
            <div className="error403box">
                <h1>403</h1>
                <h2>{t('ERROR_403')}</h2>
            </div>
        </div>
    );
};

export default Error403;
