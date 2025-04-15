import request from '../../../util/request';

export class UserAuthenticationService {
  static login = (data) => {
    return request({
      url: 'user/login',
      method: 'post',
      Headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      data: data
    });
  };
  static signUp = (data) => {
    return request({
      url: 'user/register',
      method: 'post',
      Headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      data: data
    });
  };

  // static register = (data) => {
  //   return request({
  //     url: '/api/v1/user/register',
  //     method: 'post',
  //     Headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  //     data: data
  //   });
  // };
}
