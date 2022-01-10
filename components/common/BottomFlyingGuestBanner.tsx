import { FunctionComponent } from "react";
import Button from '@mui/material/Button';
import { useRouter } from "next/router";
import Avatar from "./Avatar";

interface BottomFlyingGuestBannerProps {
    user: any
}

const BottomFlyingGuestBanner: FunctionComponent<BottomFlyingGuestBannerProps> = ({ user }) => {
    const router = useRouter()

    return (
        <div className="bottomFlyingGuestBanner">
            {
                user &&
                (
                    <>
                        <div
                            style={{
                                height: 36.5,
                                width: '100%'
                            }}
                        />
                        <Button
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
                            Watching {user.login}&apos;s profile
                        </Button>
                    </>
                )
            }
        </div>
    )
}

export default BottomFlyingGuestBanner;