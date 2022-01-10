import Avatar from '@mui/material/Avatar';

const AvatarMUI = ({ user, size = '110px' }) => {
    return (
        <>
            {
                user
                    ?
                    <Avatar
                        sx={{ background: 'none !important', width: size, height: size, margin: 'auto' }}
                        alt={`${user.login} ${user.name} ${user.surname} on Juicify`}
                        src={`https://juicify.app:4000/server/avatar/${user._id}.jpg`}
                    >
                        <Avatar
                            sx={{ background: 'none !important', width: size, height: size, margin: 'auto' }}
                            alt={`${user.login} ${user.name} ${user.surname} on Juicify`}
                            src='/images/logo.png'
                        />
                    </Avatar>
                    :
                    <Avatar
                        sx={{ background: 'none !important', width: size, height: size, margin: 'auto' }}
                        alt={`${user.login} ${user.name} ${user.surname} on Juicify`}
                        src='/images/logo.png'
                    />
            }
        </>
    )
}

export default AvatarMUI;