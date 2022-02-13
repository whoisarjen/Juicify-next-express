import Avatar from '@mui/material/Avatar';

interface AvatarMUIProps {
    user: any,
    size?: string
    margin?: string
}

const AvatarMUI = ({ user, size = '110px', margin = 'auto' }: AvatarMUIProps) => {
    return (
        <Avatar
            sx={{ background: 'none !important', width: size, height: size, margin }}
            alt={`${user.login} ${user.name} ${user.surname} on Juicify`}
            src={`${process.env.NEXT_PUBLIC_SERVER}/avatar/${user._id}.jpg`}
        >
            <Avatar
                sx={{ background: 'none !important', width: size, height: size, margin }}
                alt={`${user.login} ${user.name} ${user.surname} on Juicify`}
                src='/images/logo.png'
            />
        </Avatar>
    )
}

export default AvatarMUI;