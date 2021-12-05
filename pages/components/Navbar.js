import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/login">Sign in</Link></li>
            </ul>
        </nav>
    );
}
 
export default Navbar;