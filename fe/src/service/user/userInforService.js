import request from '../../util/request';
import { CookieService } from '../../util/cookieService';

const token = CookieService.getCookie('accessToken');
export class UserInforService {
  static getPublicUserInfo = (userId) => {
    return request({
      url: `user/info/${userId}`,
      method: 'get',
      Headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${token}` },
    });
  };
}
