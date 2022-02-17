import { useRouter } from "next/router";
import { ProfileNavbarProps } from ".";
import { useAppSelector } from "../../../../hooks/useRedux";

const useProfileNavbar = ({ user, tab }: ProfileNavbarProps) => {
    const router = useRouter()
    const token: any = useAppSelector(state => state.token.value)

    return { router, token, user, tab }
}

export type useProfileNavbarProps = ReturnType<typeof useProfileNavbar>

export default useProfileNavbar;