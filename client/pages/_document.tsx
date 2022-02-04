import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="icon" type="image/png" sizes="196x196" href="icons/favicon-196.png" />
                    <meta name="msapplication-square70x70logo" content="icons/mstile-icon-128.png" />
                    <meta name="msapplication-square150x150logo" content="icons/mstile-icon-270.png" />
                    <meta name="msapplication-square310x310logo" content="icons/mstile-icon-558.png" />
                    <meta name="msapplication-wide310x150logo" content="icons/mstile-icon-558-270.png" />
                    <meta name='application-name' content='Juicify' />
                    <meta name='apple-mobile-web-app-capable' content='yes' />
                    <meta name='apple-mobile-web-app-status-bar-style' content='default' />
                    <meta name='apple-mobile-web-app-title' content='Juicify' />
                    <meta name='description' content="Lets make your body juicy!" />
                    <meta name='format-detection' content='telephone=no' />
                    <meta name='mobile-web-app-capable' content='yes' />
                    <meta name='msapplication-config' content='/icons/browserconfig.xml' />
                    <meta name='msapplication-TileColor' content='#2B5797' />
                    <meta name='msapplication-tap-highlight' content='no' />
                    <meta name='theme-color' content='#121212' />

                    {/* <link rel='apple-touch-icon' href='/icons/touch-icon-iphone.png' />
                    <link rel='apple-touch-icon' sizes='152x152' href='/icons/touch-icon-ipad.png' />
                    <link rel='apple-touch-icon' sizes='180x180' href='/icons/touch-icon-iphone-retina.png' />
                    <link rel='apple-touch-icon' sizes='167x167' href='/icons/touch-icon-ipad-retina.png' />

                    <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
                    <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
                    <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#5bbad5' /> */}

                    <meta name='twitter:card' content='summary' />
                    <meta name='twitter:url' content='https://juicify.app' />
                    <meta name='twitter:title' content='Juicify' />
                    <meta name='twitter:description' content="Lets make your body juicy!" />
                    <meta name='twitter:image' content='https://juicify.app/icons/android-chrome-192x192.png' />
                    <meta name='twitter:creator' content='@DavidWShadow' />
                    <meta property='og:type' content='website' />
                    <meta property='og:title' content='Juicify' />
                    <meta property='og:description' content="Lets make your body juicy!" />
                    <meta property='og:site_name' content='Juicify' />
                    <meta property='og:url' content='https://juicify.app' />
                    <meta property='og:image' content='https://juicify.app/icons/apple-touch-icon.png' />

                    {/* apple splash screen images */}
                    <link rel="apple-touch-icon" href="icons/apple-icon-180.png" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-2048-2732.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-2732-2048.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-1668-2388.png" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-2388-1668.png" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-1536-2048.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-2048-1536.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-1668-2224.png" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-2224-1668.png" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-1620-2160.png" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-2160-1620.png" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-1284-2778.png" media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-2778-1284.png" media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-1170-2532.png" media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-2532-1170.png" media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-1125-2436.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-2436-1125.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-1242-2688.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-2688-1242.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-828-1792.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-1792-828.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-1242-2208.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-2208-1242.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-750-1334.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-1334-750.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-640-1136.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
                    <link rel="apple-touch-startup-image" href="icons/apple-splash-1136-640.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;