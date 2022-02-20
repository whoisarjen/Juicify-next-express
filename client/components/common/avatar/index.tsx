import Avatar from '@mui/material/Avatar';

interface BaseAvatarProps {
    user: any,
    size?: string
    margin?: string
}

const BaseAvatar = ({ user, size = '110px', margin = 'auto' }: BaseAvatarProps) => {
    return (
        <Avatar
            data-testid="user_logo"
            sx={{ background: 'none !important', width: size, height: size, margin }}
            alt={`${user.login} ${user.name} ${user.surname} on Juicify`}
            src={`${process.env.NEXT_PUBLIC_SERVER}/avatar/${user._id}.jpg`}
        >
            <Avatar
                data-testid="default_logo"
                sx={{ background: 'none !important', width: size, height: size, margin }}
                alt={`${user.login} ${user.name} ${user.surname} on Juicify`}
                src='/images/logo.png'
            />
        </Avatar>
    )
}

export default BaseAvatar;