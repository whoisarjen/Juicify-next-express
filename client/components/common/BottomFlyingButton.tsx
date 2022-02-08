import LoadingButton from '@mui/lab/LoadingButton';
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import styled from 'styled-components'

interface BottomFlyingButtonProps {
    clicked: () => void,
    isLoading: boolean,
    buttonText?: string,
    showNumberValue?: number
}

const BottomFlyingButton = styled.div`
    width: 100 %;
    position: fixed;
    bottom: 56px;
    left: 50 %;
    transform: translateX(-50 %);
    text - align: center;
    z - index: 2;
`

const BottomFlyingButtonPlaceholder = styled.div`
    width: 100%;
    height: 44px;
`

export default ({ clicked, isLoading = false, buttonText = 'Submit', showNumberValue = 0 }: BottomFlyingButtonProps) => {
    const { t } = useTranslation('home')
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => setLoading(isLoading), [isLoading])

    return (
        <>
            <BottomFlyingButton>
                <LoadingButton
                    onClick={clicked}
                    loading={loading}
                    variant="contained"
                >
                    {t(buttonText)}{showNumberValue > 0 && ` (${showNumberValue})`}
                </LoadingButton>
            </BottomFlyingButton>
            <BottomFlyingButtonPlaceholder />
        </>
    )
}