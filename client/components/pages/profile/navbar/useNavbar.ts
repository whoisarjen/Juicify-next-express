import { useRouter } from "next/router";
import { NavbarProps } from ".";
import { useAppSelector } from "../../../../hooks/useRedux";

const useNavbar = ({ user, tab }: NavbarProps) => {
    const router = useRouter()
    const token: any = useAppSelector(state => state.token.value)

    return { router, token, user, tab }
}

export type useNavbarProps = ReturnType<typeof useNavbar>

export default useNavbar;