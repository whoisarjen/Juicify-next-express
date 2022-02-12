import Image from 'next/image'
import logoImage from '../../public/images/logo.png'

const Logo = ({ size }: { size: number }) => {
    return <Image width={size} height={size} alt="juicify.app" src={logoImage} />
}

export default Logo;