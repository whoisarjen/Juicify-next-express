import { useButtonSubmitItemsProps } from "./useButtonSubmitItems";
import LoadingButton from '@mui/lab/LoadingButton';
import styled from 'styled-components'

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

const BaseButtonSubmitItems = ({ clicked, showNumberValue, t }: useButtonSubmitItemsProps) => {

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
                    {t('Submit')}{showNumberValue > 0 && ` (${showNumberValue})`}
                </LoadingButton>
            </Button>
        </>
    )
}

export default BaseButtonSubmitItems;