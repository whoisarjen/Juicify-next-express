const withPWA = require("next-pwa");
const nextTranslate = require("next-translate");

const getCookie = (cookieName) => {
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}

module.exports = withPWA({
    reactStrictMode: true,
    pwa: {
        dest: "public",
        register: true,
        skipWaiting: true,
        disable: process.env.NODE_ENV === 'development',
    },
    ...nextTranslate(),
});
