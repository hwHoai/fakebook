import request from '../../../util/request';
import { CookieService } from '../../../util/cookieService';

export class UserMessageService {
  static getUserInboxList = (userId) => {
    return request({
      url: `/message/inbox/${userId}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${CookieService.getCookie('accessToken')}`
      }
    });
  };

  static getMessagesWithFriend = (friendId, page = 0, size = 20) => {
    return request({
      url: `/message/chat/${friendId}?page=${page}&size=${size}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${CookieService.getCookie('accessToken')}`
      }
    });
  };

  static markMessagesAsRead = (friendId) => {
    return request({
      url: `/message/chat/mark_read/${friendId}`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${CookieService.getCookie('accessToken')}`
      }
    });
  };
}
