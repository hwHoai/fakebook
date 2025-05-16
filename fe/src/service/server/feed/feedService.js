import { CookieService } from '../../../util/cookieService';
import request from '../../../util/request';

const token = CookieService.getCookie('accessToken');
export class FeedService {
  static createNewFeed = (data) => {
    return request({
      url: 'feed/create',
      method: 'post',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${token}` },
      data: data
    });
  };

  static getNewFeed = (userId) => {
    return request({
      url: 'feed/new_feeds',
      method: 'get',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${token}` },
      params: { userId }
    });
  };
  static getNewFeedForGuest = () => {
    return request({
      url: 'feed/guest/new_feeds',
      method: 'get',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
    });
  };
  static getUserFeed = (userId) => {
    return request({
      url: `feed/user_feeds/${userId}`,
      method: 'get',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
    });
  };
}
