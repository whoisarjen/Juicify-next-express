import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"

const useBottomFlyingGuestBanner = ({ user }: { user: any }) => {
    const router = useRouter()
    const { t } = useTranslation()

    return { user, t, router }
}

export type useBottomFlyingGuestBannerProps = ReturnType<typeof useBottomFlyingGuestBanner>

export default useBottomFlyingGuestBanner;