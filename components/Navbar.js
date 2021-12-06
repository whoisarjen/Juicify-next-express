import Link from 'next/link'
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
            </ul>
        </nav>
    );
}
 
export default Navbar;