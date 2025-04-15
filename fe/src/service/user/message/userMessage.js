import request from '../../../util/request';
import { CookieService } from '../../../util/cookieService';

export class UserMessageService {
  static getUserInboxList = (userId) => {
    return request({
      url: `/api/v1/message/inbox/${userId}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${CookieService.getCookie('accessToken')}`
      }
    });
  };
}
