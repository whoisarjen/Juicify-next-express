import LoadingButton from '@mui/lab/LoadingButton';
import useTranslation from "next-translate/useTranslation";
import { FunctionComponent, useEffect, useState } from "react";

interface BottomFlyingButtonProps {
    clicked: () => void,
    isLoading: boolean,
    buttonText?: string
}

const BottomFlyingButton: FunctionComponent<BottomFlyingButtonProps> = ({ clicked, isLoading = false, buttonText = 'Submit' }) => {
    const { t } = useTranslation('home')
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => setLoading(isLoading), [isLoading])

    return (
        <>
            <div className="bottomFlyingButton">
                <LoadingButton
                    onClick={clicked}
                    loading={loading}
                    variant="contained"
                >
                    {t(buttonText)}
                </LoadingButton>
            </div>
            <div className="bottomFlyingButtonPlaceholder" />
        </>
    )
}


export default BottomFlyingButton;