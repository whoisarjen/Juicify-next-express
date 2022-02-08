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

const Button = styled.div`
    width: 100%;
    position: fixed;
    bottom: 56px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 2;
`

const Placeholder = styled.div`
    width: 100%;
    height: 44px;
`

const BottomFlyingButton = ({ clicked, isLoading = false, buttonText = 'Submit', showNumberValue = 0 }: BottomFlyingButtonProps) => {
    const { t } = useTranslation('home')
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => setLoading(isLoading), [isLoading])

    return (
        <>
            <Button>
                <LoadingButton
                    onClick={clicked}
                    loading={loading}
                    variant="contained"
                >
                    {t(buttonText)}{showNumberValue > 0 && ` (${showNumberValue})`}
                </LoadingButton>
            </Button>
            <Placeholder />
        </>
    )
}

export default BottomFlyingButton;