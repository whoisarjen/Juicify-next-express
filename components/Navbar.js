import Link from 'next/link'
import Avatar from '@mui/material/Avatar';
import useTranslation from 'next-translate/useTranslation'

const Navbar = () => {
    const { t } = useTranslation('home')
    return (
        <nav className="navbar">
            <ul>
                <li><Link href="/">{t('Home')}</Link></li>
                <li><Link href="/blog">{t('Blog')}</Link></li>
                <li><Link href="/contact">{t('Contact')}</Link></li>
                <li><Link href="/login">{t('Sign in')}</Link></li>
                <li><Avatar alt="Remy Sharp" src="https://juicify.app:4000/server/avatar/60ba774fe0ecd72587eeaa29.jpg"/></li>
            </ul>
        </nav>
    );
}
 
export default Navbar;