import request from '../../../util/request';

export class UserAuthenticationService {
  static login = (data) => {
    return request({
      url: 'user/login',
      method: 'post',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      data: data
    });
  };
  static signUp = (data) => {
    return request({
      url: 'user/register',
      method: 'post',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      data: data
    });
  };

  static reNewToken = (refToken) => {
    return request({
      url: 'user/renew_tokens',
      method: 'post',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      data: { refToken }
    });
  };

  // static register = (data) => {
  //   return request({
  //     url: '/api/v1/user/register',
  //     method: 'post',
  //     headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  //     data: data
  //   });
  // };
}
