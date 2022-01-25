import jwt from 'jsonwebtoken'

export function signJWT(object: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, process.env.TOKEN_KEY as string, {
        ...(options && options),
        // algorithm: 'RS256'
    })
}

export function verifyJWT(token: string) {
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY as string)
        return {
            valid: true,
            expired: false,
            decoded,
        }
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        }
    }
}