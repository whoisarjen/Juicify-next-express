import BaseBottomFlyingGuestBanner from "./BottomFlyingGuestBanner";
import useBottomFlyingGuestBanner from "./useBottomFlyingGuestBanner";

const BottomFlyingGuestBanner = ({ user }: { user: any }) => {
    const props = useBottomFlyingGuestBanner({ user })

    return <BaseBottomFlyingGuestBanner {...props} />
}

export default BottomFlyingGuestBanner;