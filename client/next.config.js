const withPWA = require("next-pwa");
const nextTranslate = require("next-translate");

module.exports = withPWA({
    reactStrictMode: true,
    // pwa: {
    //     dest: "public",
    //     register: true,
    //     skipWaiting: true
    // },
    ...nextTranslate(),
});
