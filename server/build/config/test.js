"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    PORT: 4000,
    DB_URI: '',
    SALT_WORK_FACTORY: 10,
    APP_VERSION: 1,
    numberSupportedDays: 28 + 1,
    ORIGIN: 'http://localhost:3000',
    TOKEN_LIFE_TIME_IN_S: 1000 * 60 * 15,
    REFRESH_TOKEN_LIFE_TIME_IN_S: 1000 * 60 * 60 * 25 * 365,
    COOKIE_TOKEN_LIFE_TIME_IN_S: 1000 * 60 * 60 * 25 * 29,
    COOKIE_REFRESH_TOKEN_LIFE_TIME_IN_S: 1000 * 60 * 60 * 25 * 365,
    COOKIE_DOMAIN: 'localhost',
    COOKIE_SECURE: false,
    COOKIE_HTTPONLY: false,
    TOKEN_KEY: `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsZ+x7vKEUS8NFnIKXP9AjVFJD+bQDSbPFv7gTKfrIng5eDAUElRUHgCRUsXPlHlvjYVlO4rlAtG1k73uVHKjZYOrF1XDOjZefI64ItYAUM0JKeWAk2DWPqT0n78gL8uzUGaybOQM+9UPX09BOTX2AoaRBBpdF1reCrWKz6oyV9wIDAQAB`,
};
