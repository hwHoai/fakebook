import request from '../../../util/request';

export class UserAuthenticationService {
  static login = (data) => {
    return request({
      url: '/api/v1/user/login',
      method: 'post',
      Headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      data: data
    });
  };
}
