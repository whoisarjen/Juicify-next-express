import LoadingButton from '@mui/lab/LoadingButton';
import useTranslation from "next-translate/useTranslation";
import styled from 'styled-components'

interface BottomFlyingButtonProps {
    clicked: () => void,
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

const BottomFlyingButton = ({ clicked, buttonText = 'Submit', showNumberValue = 0 }: BottomFlyingButtonProps) => {
    const { t } = useTranslation('home')

    if (!showNumberValue) {
        return <></>
    }

    return (
        <>
            <Placeholder />
            <Button>
                <LoadingButton
                    onClick={clicked}
                    variant="contained"
                    type="submit"
                >
                    {t(buttonText)}{showNumberValue > 0 && ` (${showNumberValue})`}
                </LoadingButton>
            </Button>
        </>
    )
}

export default BottomFlyingButton;