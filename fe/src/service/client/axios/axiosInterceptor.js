import { TokenService } from '../../../util/tokenService';
import { UserAuthenticationService } from '../../user/auth/userAuthentication';
import { CookieService } from '../../../util/cookieService';
import { ERRORCODE } from '../../../constant/code';

export class AxiosInterceptor {
  static preRequest = async (config) => {
    if (
      config.url === 'user/renew_tokens' ||
      config.url === 'user/login' ||
      config.url === 'user/register' ||
      config.url === 'feed/guest/new_feeds'
    ) {
      return config;
    }

    const accessToken = CookieService.getCookie('accessToken');
    const refreshToken = CookieService.getCookie('refreshToken');
    if (accessToken && !TokenService.isTokenExpired(accessToken) && !TokenService.isTokenExpired(refreshToken)) {
      return config;
    }
    
    if ((!accessToken || TokenService.isTokenExpired(accessToken)) && !TokenService.isTokenExpired(refreshToken)) {
      await UserAuthenticationService.reNewToken(CookieService.getCookie('refreshToken')).then((res) => {
        try {
          console.log('Renew token response:', res);
          if(!res) {
            throw new Error({ message: 'Token is null', code: ERRORCODE.TOKEN_NULL });
          }
          return res;
        } catch (error) {
          console.log('Error renewing token', error);
        }
      }).then( async (res) => {
        const accessTokenPayload = TokenService.decodeToken(res.accessToken);
        const refreshTokenPayload = TokenService.decodeToken(res.refreshToken);
        await CookieService.setCookie('accessToken', res.accessToken, new Date(accessTokenPayload.exp * 1000));
        await CookieService.setCookie('refreshToken', res.refreshToken, new Date(refreshTokenPayload.exp * 1000));
        config.headers['Authorization'] = `Bearer ${res.accessToken}`;
        return config;
      });
      return config;
    }
  };
}
