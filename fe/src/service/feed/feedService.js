import { CookieService } from '../../util/cookieService';
import request from '../../util/request';

const token = CookieService.getCookie('accessToken');
export class FeedService {
  static createNewFeed = (data) => {
    return request({
      url: 'feed/create',
      method: 'post',
      Headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${token}` },
      data: data
    });
  };
}
