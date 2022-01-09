import { FunctionComponent } from "react";
import Head from 'next/head'

interface HeaderProps {
    title: string,
    description: string
}

const Header: FunctionComponent<HeaderProps> = ({ title, description }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            <meta name="description" content={description} />
        </Head>
    )
}

export default Header;