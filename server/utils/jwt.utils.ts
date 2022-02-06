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

export const getCookie = async (name: string, tokens: string | undefined) => {
    if (tokens) {
        let nameEQ = name + "=";
        let ca = tokens.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

export const parseBoolean = (value: string | boolean): boolean => value.toString().toLowerCase() === 'true' ? true : false