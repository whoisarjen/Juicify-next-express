import { useBottomFlyingGuestBannerProps } from "./useBottomFlyingGuestBanner";
import Button from '@mui/material/Button';
import Avatar from "../avatar";
import styled from 'styled-components'

const Placeholder = styled.div`
    height: 36.5px;
    width: 100%;
`

const BaseBottomFlyingGuestBanner = ({ user, t, router, token }: useBottomFlyingGuestBannerProps) => {

    if (!user || user.login == token.login) {
        return <></>
    }

    return (
        <>
            <Placeholder />
            <Button
                data-testid="BottomFlyingGuestBanner"
                onClick={() => router.push(`/${router.query.login}`)}
                sx={{
                    maxWidth: 700,
                    position: 'fixed',
                    bottom: 52,
                    width: 'calc( 100% - 24px )'
                }}
                variant="contained"
                startIcon={<Avatar user={user} size="24px" />}
            >
                {t('WATCHING')} {user.login}
            </Button>
        </>
    )
}

export default BaseBottomFlyingGuestBanner;