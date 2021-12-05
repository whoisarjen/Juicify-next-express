import Link from 'next/link'

const Navbar = () => {
    return (
        <div className="navbar">
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
        </div>
    );
}
 
export default Navbar;