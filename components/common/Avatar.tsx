import Avatar from '@mui/material/Avatar';

export default ({ object, size = '110px' }) => {
    return (
        <Avatar
            sx={{ background: 'none !important', width: size, height: size, margin: 'auto' }}
            alt={`${object.login} ${object.name} ${object.surname} on Juicify`}
            src={`https://juicify.app:4000/server/avatar/${object._id}.jpg`}
        >
            <Avatar
                sx={{ background: 'none !important', width: size, height: size, margin: 'auto' }}
                alt={`${object.login} ${object.name} ${object.surname} on Juicify`}
                src="http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.77a8e0c9.png&w=48&q=75"
            />
        </Avatar>
    )
}