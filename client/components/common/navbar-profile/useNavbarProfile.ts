import { useRouter } from "next/router";
import { NavbarProfileProps } from ".";
import { useAppSelector } from "../../../hooks/useRedux";

const useNavbarProfile = ({ user, tab }: NavbarProfileProps) => {
    const router = useRouter()
    const token: any = useAppSelector(state => state.token.value)

    return { router, token, user, tab }
}

export type useNavbarProfileProps = ReturnType<typeof useNavbarProfile>

export default useNavbarProfile;