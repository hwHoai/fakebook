export class TokenService {
    static decodeToken = (token) => {
        if (!token) return null;

        const base64Token = token.split('.')[1];
        if (!base64Token) return null;

        const payloadToken = base64Token.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(atob(payloadToken));
    }

    static isTokenExpired = (token) => {
        const decodedToken = this.decodeToken(token);
        if (!decodedToken) return true;

        const currentTime = Date.now() / 1000;
        return decodedToken.exp - currentTime < 5 * 60;
    }
}