import Head from 'next/head'

interface HeaderProps {
    title: string,
    description: string
}

const Header = ({ title, description }: HeaderProps) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            <meta name="description" content={description} />
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-RTCFC3JGV2"></script>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-RTCFC3JGV2');`
                }}
            />
        </Head>
    )
}

export default Header;