export default {
    PORT: 4000,
    DB_URI: '',
    SALT_WORK_FACTORY: 10,
    accesssTokenTtl: '15m',
    refreshTokenTtl: '1y',
    APP_VERSION: 1,
    numberSupportedDays: 28 + 1, // One more than client site is supporting
    TOKEN_KEY: `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsZ+x7vKEUS8NFnIKXP9AjVFJD+bQDSbPFv7gTKfrIng5eDAUElRUHgCRUsXPlHlvjYVlO4rlAtG1k73uVHKjZYOrF1XDOjZefI64ItYAUM0JKeWAk2DWPqT0n78gL8uzUGaybOQM+9UPX09BOTX2AoaRBBpdF1reCrWKz6oyV9wIDAQAB`,
};