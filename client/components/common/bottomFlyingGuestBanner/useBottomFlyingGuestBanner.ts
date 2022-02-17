import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useAppSelector } from "../../../hooks/useRedux"

const useBottomFlyingGuestBanner = ({ user }: { user: any }) => {
    const router = useRouter()
    const { t } = useTranslation()
    const token: any = useAppSelector(state => state.token.value)

    return { user, t, router, token }
}

export type useBottomFlyingGuestBannerProps = ReturnType<typeof useBottomFlyingGuestBanner>

export default useBottomFlyingGuestBanner;