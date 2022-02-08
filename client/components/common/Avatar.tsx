import Avatar from '@mui/material/Avatar';
import { FunctionComponent } from 'react';

interface AvatarMUIProps {
    user: any,
    size?: string
    margin?: string
}

const AvatarMUI: FunctionComponent<AvatarMUIProps> = ({ user, size = '110px', margin = 'auto' }) => {
    return (
        <>
            {/* {
                user
                    ?
                    <Avatar
                        sx={{ background: 'none !important', width: size, height: size, margin }}
                        alt={`${user.login} ${user.name} ${user.surname} on Juicify`}
                        src={`https://${process.env.NEXT_PUBLIC_SERVER}/server/avatar/${user._id}.jpg`}
                    >
                        <Avatar
                            sx={{ background: 'none !important', width: size, height: size, margin }}
                            alt={`${user.login} ${user.name} ${user.surname} on Juicify`}
                            src='/images/logo.png'
                        />
                    </Avatar>
                    :
                    <Avatar
                        sx={{ background: 'none !important', width: size, height: size, margin }}
                        alt={`${user.login} ${user.name} ${user.surname} on Juicify`}
                        src='/images/logo.png'
                    />
            } */}
        </>
    )
}

export default AvatarMUI;