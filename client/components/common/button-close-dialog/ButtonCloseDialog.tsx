import Button from '@mui/material/Button';
import styled from 'styled-components';
import { useButtonCloseDialogProps } from './useButtonCloseDialog';

const Close = styled.div`
    display: grid;
    width: calc(100% - 10px);
    padding: 3.75px 5px;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background: var(--theme-background);
    z-index: 2;
`

const CloseButtonPlaceholder = styled.div`
    width: 100%;
    height: 44px;
`

const BaseButtonCloseDialog = ({ clicked, t }: useButtonCloseDialogProps) => {
    return (
        <>
            <CloseButtonPlaceholder />
            <Close onClick={clicked}>
                <Button variant="contained">
                    {t('Close')}
                </Button>
            </Close>
        </>
    )
}

export default BaseButtonCloseDialog;