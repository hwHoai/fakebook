export class TokenService {
    static decodeToken = (token) => {
        return JSON.parse(atob(token.split('.')[1]).split(','));
    }
}