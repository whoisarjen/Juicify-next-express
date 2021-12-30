import Avatar from '@mui/material/Avatar';

export default ({ user, size = '110px' }) => {
    return (
        <Avatar
            sx={{ background: 'none !important', width: size, height: size, margin: 'auto' }}
            alt={`${user.login} ${user.name} ${user.surname} on Juicify`}
            src={`https://juicify.app:4000/server/avatar/${user._id}.jpg`}
        >
            <Avatar
                sx={{ background: 'none !important', width: size, height: size, margin: 'auto' }}
                alt={`${user.login} ${user.name} ${user.surname} on Juicify`}
                src="http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.77a8e0c9.png&w=48&q=75"
            />
        </Avatar>
    )
}